#!/usr/bin/env node
// Build-time sync of upcoming meetups from the JUG Gujarat Luma calendar (ICS feed)
// into src/content/generated/luma-events.json (npm "prebuild").
// Never fails the build: on any error it warns and keeps the last committed JSON.
// Set LUMA_ICS_FILE=<path> to read a local .ics instead of the network.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { events as nativeEvents } from '../src/content/events.js';
import { site } from '../src/content/site.js';
import { getStatus } from '../src/content/status.js';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/content/generated/luma-events.json');
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/** Parses ICS text into a list of VEVENTs: [{ SUMMARY: { value, params }, ... }]. */
function parseIcs(text) {
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error('response is not an iCalendar feed');
  const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const vevents = [];
  let current = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') current = {};
    else if (line === 'END:VEVENT') {
      vevents.push(current);
      current = null;
    } else if (current) {
      const colon = line.indexOf(':');
      if (colon < 0) continue;
      const [name, ...params] = line.slice(0, colon).split(';');
      const value = line
        .slice(colon + 1)
        .replace(/\\([nN,;\\])/g, (_, c) => (c === 'n' || c === 'N' ? '\n' : c));
      current[name.toUpperCase()] = { value, params: Object.fromEntries(params.map((p) => p.split('='))) };
    }
  }
  return vevents;
}

/** Offset (ms) of `timeZone` from UTC at the instant `ms`. */
function zoneOffsetMs(ms, timeZone) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
      .formatToParts(new Date(ms))
      .map((x) => [x.type, x.value]),
  );
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - ms;
}

/** ICS DTSTART/DTEND -> { date: 'YYYY-MM-DD', time?: 'HH:mm' } in IST. Floating times are taken as IST. */
function toIst({ value, params }) {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!m) throw new Error(`unsupported date "${value}"`);
  const [, y, mo, d, h, mi, , utc] = m;
  if (h === undefined) return { date: `${y}-${mo}-${d}` };
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  let instant = wall - IST_OFFSET_MS;
  if (utc) instant = wall;
  else if (params.TZID) instant = wall - zoneOffsetMs(wall, params.TZID);
  const iso = new Date(instant + IST_OFFSET_MS).toISOString();
  return { date: iso.slice(0, 10), time: iso.slice(11, 16) };
}

const kebab = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const normalizeUrl = (url) => url?.replace(/\/+$/, '').toLowerCase();
const isUrl = (s) => /^https?:\/\//i.test(s);
const ONLINE_RE = /zoom\.us|meet\.google|teams\.microsoft|webex|luma\.com|lu\.ma/i;

/** Physical place from LOCATION; city is the last address part that isn't a state/country/pin code. */
function toPlace(location) {
  if (!location || (isUrl(location) && ONLINE_RE.test(location))) return { online: true };
  const parts = location.split(',').map((p) => p.trim()).filter(Boolean);
  const city = parts.filter((p) => !/^(india|gujarat)\b|\d{5,6}/i.test(p)).at(-1) ?? parts[0];
  return { location: { name: location, city } };
}

function toEvent(vevent) {
  const get = (k) => vevent[k]?.value;
  const description = get('DESCRIPTION') ?? '';
  const url = description.match(/information at:\s*(https?:\/\/\S+)/i)?.[1];
  if (!url || !get('SUMMARY') || !vevent.DTSTART || get('STATUS') === 'CANCELLED') return null;

  const start = toIst(vevent.DTSTART);
  const end = vevent.DTEND ? toIst(vevent.DTEND) : undefined;
  const about = description
    .split(/\n{2,}/)
    .filter((p) => !/^(Get up-to-date information|Hosted by)/i.test(p.trim()))
    .join('\n\n')
    .trim();
  return {
    slug: `${kebab(get('SUMMARY')).slice(0, 60).replace(/-$/, '') || 'luma-event'}-${start.date}`,
    name: get('SUMMARY'),
    ...(about && { description: about }),
    date: start.date,
    ...(start.time && { startTime: start.time }),
    ...(end?.date === start.date && end.time && end.time > start.time && { endTime: end.time }),
    ...toPlace(get('LOCATION')),
    registrationUrl: url,
    externalUrl: url,
    source: 'luma',
  };
}

async function readFeed() {
  if (process.env.LUMA_ICS_FILE) return readFileSync(process.env.LUMA_ICS_FILE, 'utf8');
  const res = await fetch(site.lumaIcsUrl, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

try {
  const vevents = parseIcs(await readFeed());
  const nativeUrls = new Set(nativeEvents.flatMap((e) => [e.externalUrl, e.registrationUrl]).filter(Boolean).map(normalizeUrl));
  const now = new Date();
  const found = vevents.map(toEvent).filter(Boolean);
  const future = found.filter((e) => getStatus(e, now) !== 'completed');
  const fresh = future.filter((e) => !nativeUrls.has(normalizeUrl(e.externalUrl)));

  const json = `${JSON.stringify(fresh, null, 2)}\n`;
  let previous = '';
  try {
    previous = readFileSync(OUT, 'utf8');
  } catch {
    // first run
  }
  if (json !== previous) writeFileSync(OUT, json);

  console.log(`Luma sync: ${vevents.length} in feed, ${future.length} upcoming, ${fresh.length} not already in events.js`);
  for (const e of fresh) console.log(`  - ${e.date} ${e.name} (${e.externalUrl})`);
} catch (error) {
  console.warn(`Luma sync skipped (${error.message}); keeping the existing src/content/generated/luma-events.json`);
}
