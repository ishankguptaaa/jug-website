#!/usr/bin/env node
// Build-time sync of meetups from the JUG Gujarat Luma calendar (ICS feed)
// into src/content/generated/luma-events.json (npm "prebuild").
// Emits every feed event (past and future) whose Luma URL isn't already on a native event.
// Never fails the build: on any error it warns and keeps the last committed JSON.
// Set LUMA_ICS_FILE=<path> to read a local .ics instead of the network.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import * as content from '../src/content/index.js';
import { events as nativeEvents } from '../src/content/events.js';
import { site } from '../src/content/site.js';
import { dateInIST, istToDate, timeInIST } from '../src/content/status.js';
import { isLumaUrl, lumaKey, lumaKeysOf } from '../src/content/lumaUrl.js';
import { validateContent } from '../src/content/validate.js';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/content/generated/luma-events.json');
const PROPERTY_RE = /^([^:;]+)((?:;[^:;=]+=(?:"[^"]*"|[^:;"]*))*):(.*)$/;
const MEETING_RE = /zoom\.us|meet\.google\.com|teams\.microsoft\.com/i;
const BOILERPLATE_RE = /^(Get up-to-date information|Hosted by|Address:)/i;

/** Parses ICS text into a list of VEVENTs: [{ SUMMARY: { value, params }, ... }]. Nested components (VALARM…) are ignored. */
function parseIcs(text) {
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error('response is not an iCalendar feed');
  const vevents = [];
  let current = null;
  let depth = 0;
  for (const line of text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/)) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
      depth = 0;
    } else if (!current) {
      continue;
    } else if (line === 'END:VEVENT') {
      vevents.push(current);
      current = null;
    } else if (line.startsWith('BEGIN:')) {
      depth++;
    } else if (line.startsWith('END:')) {
      depth--;
    } else if (depth === 0) {
      const m = line.match(PROPERTY_RE);
      if (!m) continue;
      const [, name, rawParams, raw] = m;
      const params = Object.fromEntries(
        rawParams.split(';').filter(Boolean).map((p) => {
          const [key, ...rest] = p.split('=');
          return [key.toUpperCase(), rest.join('=').replace(/^"(.*)"$/, '$1')];
        }),
      );
      const value = raw.replace(/\\([nN,;\\])/g, (_, c) => (c === 'n' || c === 'N' ? '\n' : c));
      current[name.toUpperCase()] = { value, params };
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
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(?:\d{2})?(Z)?)?$/);
  if (!m) throw new Error(`unsupported date "${value}"`);
  const [, y, mo, d, h, mi, utc] = m;
  if (h === undefined) return { date: `${y}-${mo}-${d}` };
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  const instant = utc
    ? new Date(wall)
    : params.TZID
      ? new Date(wall - zoneOffsetMs(wall, params.TZID))
      : istToDate(`${y}-${mo}-${d}`, `${h}:${mi}`);
  return { date: dateInIST(instant), time: timeInIST(instant) };
}

const kebab = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Place from LOCATION. Luma puts its own event URL there for Zoom events and for
 * events with a hidden address, so only meeting links (online) and street
 * addresses (name, address, city before the state/pin code) count; else no place.
 */
function toPlace(location) {
  if (!location) return {};
  if (/^https?:\/\//i.test(location)) return !isLumaUrl(location) && MEETING_RE.test(location) ? { online: true } : {};
  const parts = location.split(',').map((p) => p.trim()).filter(Boolean);
  const stateAt = parts.findIndex((p) => /(^|\s)\d{6}$/.test(p) || /^gujarat$/i.test(p));
  if (stateAt < 2) return {};
  return { location: { name: parts[0], address: parts.slice(1, stateAt).join(', '), city: parts[stateAt - 1] } };
}

function toEvent(vevent) {
  const get = (k) => vevent[k]?.value;
  const description = get('DESCRIPTION') ?? '';
  const url = description.match(/information at:\s*(https?:\/\/\S+)/i)?.[1];
  const code = kebab(url ? new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? '' : '');
  if (!code || !get('SUMMARY') || !vevent.DTSTART || get('STATUS') === 'CANCELLED') return null;

  const start = toIst(vevent.DTSTART);
  const end = vevent.DTEND ? toIst(vevent.DTEND) : undefined;
  const about = description
    .split(/\n{2,}/)
    .filter((p) => !BOILERPLATE_RE.test(p.trim()))
    .join('\n\n')
    .trim();
  return {
    slug: `${kebab(get('SUMMARY')).slice(0, 60).replace(/-$/, '') || 'luma-event'}-${code}`,
    name: get('SUMMARY'),
    ...(about && { description: about }),
    date: start.date,
    ...(start.time && { startTime: start.time }),
    ...(end?.date === start.date && end.time && end.time > start.time && { endTime: end.time }),
    ...toPlace(get('LOCATION')),
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
  const found = [];
  for (const vevent of vevents) {
    try {
      const event = toEvent(vevent);
      if (event) found.push(event);
    } catch (error) {
      console.warn(`Luma sync: skipped "${vevent.SUMMARY?.value ?? '?'}" (${error.message})`);
    }
  }
  const nativeKeys = lumaKeysOf(nativeEvents);
  const fresh = found.filter((e) => !nativeKeys.has(lumaKey(e.externalUrl)));

  const problemsWith = (events) => new Set(validateContent({ ...content, events }));
  const existing = problemsWith(nativeEvents);
  const caused = [...problemsWith([...nativeEvents, ...fresh])].filter((p) => !existing.has(p));
  if (caused.length) throw new Error(`generated events fail validation: ${caused.join('; ')}`);

  const json = `${JSON.stringify(fresh, null, 2)}\n`;
  let previous = '';
  try {
    previous = readFileSync(OUT, 'utf8');
  } catch {
    // first run
  }
  if (json !== previous) writeFileSync(OUT, json);

  console.log(`Luma sync: ${vevents.length} in feed, ${fresh.length} not already in events.js`);
  for (const e of fresh) console.log(`  - ${e.date} ${e.name} (${e.externalUrl})`);
} catch (error) {
  console.warn(`Luma sync skipped (${error.message}); keeping the existing src/content/generated/luma-events.json`);
}
