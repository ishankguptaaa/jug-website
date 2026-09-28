// Conferences — multi-track / flagship events (e.g. Community Day for Java).
// Status (upcoming/live/completed) is computed from startDate/endDate +
// startTime/endTime in Asia/Kolkata by status.js — never hand-write it.
// Set `statusOverride` only to force a status manually.
//
// Fields:
//   slug, name, tagline, description (string[] paragraphs)
//   startDate, endDate          'YYYY-MM-DD'
//   startTime, endTime          'HH:mm' IST (startTime applies to startDate, endTime to endDate)
//   location                    human-readable, e.g. 'LJ University, Ahmedabad'
//   venues[]                    venue slugs (venues.js)
//   banner, registrationUrl, externalUrl?
//   cfp?                        { url, closesOn? ('YYYY-MM-DD') } call for papers
//   tracks[]                    [{ slug, name }]
//   highlights[]                short bullet strings
//   stats                       { attendees, speakers, sessions, ... } (display strings/numbers)
//   announcements[]             [{ date, title, body }]
//   sponsors[]                  [{ sponsor: <sponsor slug>, tier: 'platinum'|'gold'|'silver'|'community-supporter' }]
//   partners[]                  sponsor slugs of kind 'jug' / 'community', in display order
//   statusOverride?             'upcoming' | 'live' | 'completed'
//   isSample?
//
// Sessions point at a conference via `conference: <slug>` (sessions.js);
// speakers are derived from those sessions.

// Slug of the legacy flagship page (also served at /community-day-for-java-2025).
// The single place this string lives in code; routes and pages import it.
export const CDJ_2025_SLUG = 'community-day-for-java-2025';

export const conferences = [
  {
    slug: CDJ_2025_SLUG,
    name: 'Community Day for Java, 2025',
    tagline: 'Join the Biggest Java Community Event in Gujarat!',
    description: [
      'Community Day for Java, 2025 is our flagship annual tech event dedicated to fostering knowledge-sharing, networking, and professional growth within the Java ecosystem.',
      'Join Java professionals, tech leaders, and aspiring developers for insightful sessions, hands-on workshops, and opportunities to connect with like-minded enthusiasts.',
    ],
    startDate: '2025-04-27',
    endDate: '2025-04-27',
    startTime: '07:30',
    endTime: '14:55',
    location: 'LJ University, Ahmedabad',
    venues: ['lj-university'],
    banner: '/Home/community-banner.png',
    registrationUrl: 'https://konfhub.com/community-day-for-java-2025',
    cfp: { url: 'https://www.papercall.io/community-day-for-java' },
    tracks: [],
    highlights: [
      'Engaging Tech Talks',
      'Exclusive Swags & Goodies',
      'Delicious Food & Refreshments',
      'And much more',
    ],
    stats: {
      attendees: '300+',
      speakers: 4,
      sessions: 4,
    },
    announcements: [],
    sponsors: [
      { sponsor: 'codelab-technologies', tier: 'platinum' },
      { sponsor: 'rezoomex', tier: 'platinum' },
      { sponsor: 'staunchsys', tier: 'gold' },
      { sponsor: 'dataorb', tier: 'gold' },
      { sponsor: 'rajesh-c', tier: 'community-supporter' },
      { sponsor: 'hemal-trivedi', tier: 'community-supporter' },
    ],
    partners: [
      'tamil-jug',
      'kerala-jug',
      'bangalore-jug',
      'hyderabad-jug',
      'docker-ahmedabad',
      'open-source-weekend-ahmedabad',
      'cncg-ahmedabad',
      'gdg-gandhinagar',
    ],
  },
];
