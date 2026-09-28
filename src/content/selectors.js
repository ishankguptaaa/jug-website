// Pure lookup/derivation functions over the content modules.
// Relationships are stored on one side only (see the entity files);
// every reverse relationship is derived here.
// No React, no window/document. Time-dependent selectors take `now`.

import { events } from './events.js';
import { conferences } from './conferences.js';
import { speakers } from './speakers.js';
import { sessions, SPEAKER_SESSION_TYPES } from './sessions.js';
import { venues } from './venues.js';
import { sponsors } from './sponsors.js';
import { galleries } from './galleries.js';
import { site } from './site.js';
import { getStatus, getStartDateTime } from './status.js';

// ---------- helpers ----------

const indexBySlug = (list) => new Map(list.map((item) => [item.slug, item]));

const eventsBySlug = indexBySlug(events);
const conferencesBySlug = indexBySlug(conferences);
const speakersBySlug = indexBySlug(speakers);
const sessionsBySlug = indexBySlug(sessions);
const venuesBySlug = indexBySlug(venues);
const sponsorsBySlug = indexBySlug(sponsors);
const galleriesBySlug = indexBySlug(galleries);

const startMs = (entity) => getStartDateTime(entity)?.getTime() ?? 0;
const byStartAsc = (a, b) => startMs(a) - startMs(b);
const byStartDesc = (a, b) => startMs(b) - startMs(a);
const bySessionTime = (a, b) =>
  (getSessionDate(a) ?? '').localeCompare(getSessionDate(b) ?? '') ||
  (a.startTime ?? '').localeCompare(b.startTime ?? '');
const compact = (list) => list.filter(Boolean);

/**
 * Date ('YYYY-MM-DD') a session happens on: its own `date`, else its event's
 * date, else its conference's startDate.
 */
export const getSessionDate = (session) =>
  session?.date ??
  (session?.event
    ? eventsBySlug.get(session.event)?.date
    : conferencesBySlug.get(session?.conference)?.startDate);

// ---------- single-record lookups ----------

export const getEventBySlug = (slug) => eventsBySlug.get(slug);
export const getConferenceBySlug = (slug) => conferencesBySlug.get(slug);
export const getSpeakerBySlug = (slug) => speakersBySlug.get(slug);
export const getSessionBySlug = (slug) => sessionsBySlug.get(slug);
export const getVenueBySlug = (slug) => venuesBySlug.get(slug);
export const getSponsorBySlug = (slug) => sponsorsBySlug.get(slug);
export const getGalleryBySlug = (slug) => galleriesBySlug.get(slug);

// ---------- speakers ----------

/** All speakers in file order. Pass `{ includeSamples: false }` to hide samples. */
export const getAllSpeakers = ({ includeSamples = true } = {}) =>
  includeSamples ? speakers : speakers.filter((s) => !s.isSample);

/**
 * Text shown before the company on speaker cards, e.g. "JVM Engineer at".
 * Uses `rolePrefix` when present, else `${designation} at`.
 */
export const getSpeakerRolePrefix = (speaker) => {
  if (!speaker) return '';
  if (speaker.rolePrefix != null) return speaker.rolePrefix;
  if (!speaker.designation) return '';
  return speaker.company ? `${speaker.designation} at` : speaker.designation;
};

/** Speakers listed in site.featuredSpeakers, in that order. */
export const getFeaturedSpeakers = () =>
  compact(site.featuredSpeakers.map((slug) => speakersBySlug.get(slug)));

/** Unique speakers of the given sessions, in order of first appearance. */
export const getSpeakersForSessions = (sessionList) => {
  const seen = new Set();
  const result = [];
  for (const session of sessionList) {
    for (const slug of session.speakers ?? []) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      const speaker = speakersBySlug.get(slug);
      if (speaker) result.push(speaker);
    }
  }
  return result;
};

/** Speakers of a conference, ordered by their first session's start time. */
export const getSpeakersForConference = (conferenceSlug) =>
  getSpeakersForSessions(getSessionsForConference(conferenceSlug));

/** Speakers of an event, ordered by their first session's start time. */
export const getSpeakersForEvent = (eventSlug) =>
  getSpeakersForSessions(getSessionsForEvent(eventSlug));

// ---------- sessions ----------

/** True for talks/workshops/panels/keynotes (i.e. not registration/opening/break). */
export const isSpeakerSession = (session) => SPEAKER_SESSION_TYPES.includes(session?.type);

/** Full agenda of a conference (incl. breaks), sorted by date then start time. */
export const getSessionsForConference = (conferenceSlug) =>
  sessions.filter((s) => s.conference === conferenceSlug).sort(bySessionTime);

/** Workshops of a conference (sessions with type 'workshop'), in schedule order. */
export const getWorkshopsForConference = (conferenceSlug) =>
  getSessionsForConference(conferenceSlug).filter((s) => s.type === 'workshop');

/** Workshops of an event, in schedule order. */
export const getWorkshopsForEvent = (eventSlug) =>
  getSessionsForEvent(eventSlug).filter((s) => s.type === 'workshop');

/** Full agenda of an event (incl. breaks), sorted by start time. */
export const getSessionsForEvent = (eventSlug) =>
  sessions.filter((s) => s.event === eventSlug).sort(bySessionTime);

/**
 * Sessions a speaker gave, newest first. Each item is the session plus
 * `date` and `parent` ({ type: 'event'|'conference', item }).
 */
export const getSessionsForSpeaker = (speakerSlug) =>
  sessions
    .filter((s) => (s.speakers ?? []).includes(speakerSlug))
    .map((s) => ({
      ...s,
      date: getSessionDate(s),
      parent: s.event
        ? { type: 'event', item: eventsBySlug.get(s.event) }
        : { type: 'conference', item: conferencesBySlug.get(s.conference) },
    }))
    .sort(
      (a, b) =>
        (b.date ?? '').localeCompare(a.date ?? '') ||
        (a.startTime ?? '').localeCompare(b.startTime ?? ''),
    );

// ---------- events ----------

/** All events, newest first. */
export const getAllEvents = () => [...events].sort(byStartDesc);

/** Events that are upcoming or live at `now`, soonest first. */
export const getUpcomingEvents = (now = new Date()) =>
  events.filter((e) => getStatus(e, now) !== 'completed').sort(byStartAsc);

/** Events completed at `now`, most recent first. */
export const getPastEvents = (now = new Date()) =>
  events.filter((e) => getStatus(e, now) === 'completed').sort(byStartDesc);

/** Meetups that belong to a conference (via event.conference). */
export const getEventsForConference = (conferenceSlug) =>
  events.filter((e) => e.conference === conferenceSlug).sort(byStartAsc);

// ---------- conferences ----------

/** All conferences, newest first. */
export const getAllConferences = () => [...conferences].sort(byStartDesc);

export const getUpcomingConferences = (now = new Date()) =>
  conferences.filter((c) => getStatus(c, now) !== 'completed').sort(byStartAsc);

export const getPastConferences = (now = new Date()) =>
  conferences.filter((c) => getStatus(c, now) === 'completed').sort(byStartDesc);

/**
 * The conference to highlight: a live one, else the next upcoming one,
 * else the most recently completed one. `undefined` if there are none.
 */
export const getCurrentConference = (now = new Date()) => {
  const live = conferences.filter((c) => getStatus(c, now) === 'live').sort(byStartAsc);
  if (live.length) return live[0];
  const upcoming = conferences.filter((c) => getStatus(c, now) === 'upcoming').sort(byStartAsc);
  if (upcoming.length) return upcoming[0];
  return getPastConferences(now)[0];
};

// ---------- sponsors & partners ----------

/**
 * Sponsors of a conference as sponsor records with `tier` attached,
 * in the conference's order. Optionally filtered by tier.
 */
export const getSponsorsForConference = (conferenceSlug, tier) => {
  const conference = conferencesBySlug.get(conferenceSlug);
  if (!conference) return [];
  return compact(
    (conference.sponsors ?? [])
      .filter((ref) => !tier || ref.tier === tier)
      .map((ref) => {
        const sponsor = sponsorsBySlug.get(ref.sponsor);
        return sponsor ? { ...sponsor, tier: ref.tier } : null;
      }),
  );
};

/** Partner communities/JUGs of a conference, optionally filtered by kind ('jug' | 'community'). */
export const getPartnersForConference = (conferenceSlug, kind) => {
  const conference = conferencesBySlug.get(conferenceSlug);
  if (!conference) return [];
  return compact((conference.partners ?? []).map((slug) => sponsorsBySlug.get(slug))).filter(
    (p) => !kind || p.kind === kind,
  );
};

// ---------- venues ----------

/** Venue records for a conference (conference.venues[]). */
export const getVenuesForConference = (conferenceSlug) =>
  compact((conferencesBySlug.get(conferenceSlug)?.venues ?? []).map((s) => venuesBySlug.get(s)));

/** Venue partner record for an event, or undefined if it uses an inline `location`. */
export const getVenueForEvent = (eventSlug) => venuesBySlug.get(eventsBySlug.get(eventSlug)?.venue);

/**
 * Where an event happens, normalised so pages don't need to branch on
 * venue partner vs inline location vs online:
 *   { name, address, city, mapUrl, online }
 * Missing values are undefined. Accepts an event record or its slug.
 */
export const getEventPlace = (eventOrSlug) => {
  const event = typeof eventOrSlug === 'string' ? eventsBySlug.get(eventOrSlug) : eventOrSlug;
  if (!event) return undefined;
  const venue = venuesBySlug.get(event.venue);
  const source = venue ?? event.location ?? {};
  return {
    name: source.name ?? (event.online ? 'Online' : undefined),
    address: source.address,
    city: source.city,
    mapUrl: source.mapUrl,
    online: Boolean(event.online),
  };
};

/**
 * Everything hosted at a venue, newest first:
 * [{ type: 'event'|'conference', item }]
 */
export const getVenueHistory = (venueSlug) =>
  [
    ...events.filter((e) => e.venue === venueSlug).map((item) => ({ type: 'event', item })),
    ...conferences
      .filter((c) => (c.venues ?? []).includes(venueSlug))
      .map((item) => ({ type: 'conference', item })),
  ].sort((a, b) => byStartDesc(a.item, b.item));

// ---------- galleries ----------

/** Galleries grouped by year, newest year first: [{ year, galleries }]. */
export const getGalleriesByYear = () => {
  const groups = new Map();
  for (const gallery of [...galleries].sort((a, b) => b.date.localeCompare(a.date))) {
    const year = Number(gallery.date.slice(0, 4));
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(gallery);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, list]) => ({ year, galleries: list }));
};

export const getGalleriesForEvent = (eventSlug) => galleries.filter((g) => g.event === eventSlug);

export const getGalleriesForConference = (conferenceSlug) =>
  galleries.filter((g) => g.conference === conferenceSlug);
