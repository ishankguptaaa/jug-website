// Events — single-day community meetups.
// To add a meetup: copy one object, give it a new unique kebab-case slug,
// and fill in the fields. Talks go in sessions.js (with `event: '<slug>'`).
// Status (upcoming/live/completed) is computed from date + startTime/endTime
// in Asia/Kolkata by status.js; set `statusOverride` only to force it.
//
// Fields:
//   slug             kebab-case, stable (used in /events/:slug)
//   name
//   description
//   date             'YYYY-MM-DD'
//   startTime        'HH:mm' (IST, 24h)
//   endTime          'HH:mm' (IST, 24h)
//   venue?           venue partner slug (venues.js)             } exactly one
//   location?        { name, address?, city } inline place      } of these
//   online?          true for online-only events                } is required
//                    (use `location` when the place isn't a venue partner)
//   banner?          root-relative image path under public/
//   registrationUrl?
//   externalUrl?     Luma (or other) event page
//   conference?      conference slug, if this meetup is part of one
//   statusOverride?  'upcoming' | 'live' | 'completed'
//   isSample?        true for placeholder records

export const events = [
  // ---- Sample meetups (placeholders — replace with real meetups) ----
  {
    slug: 'sample-meetup-java-records-deep-dive',
    name: 'Sample Meetup: Java Records Deep Dive',
    description:
      'Placeholder meetup used to preview the events pages. An evening of sample talks about modern Java data modelling.',
    date: '2025-11-15',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'sample-tech-hub',
    banner: '/Home/event-banner.webp',
    registrationUrl: 'https://example.com/register',
    isSample: true,
  },
  {
    slug: 'sample-meetup-spring-boot-in-practice',
    name: 'Sample Meetup: Spring Boot in Practice',
    description:
      'Placeholder meetup used to preview the events pages. Sample talks on building and testing Spring Boot services.',
    date: '2026-03-21',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'sample-tech-hub',
    banner: '/Home/event-banner.webp',
    registrationUrl: 'https://example.com/register',
    isSample: true,
  },
  {
    slug: 'sample-meetup-jvm-performance-online',
    name: 'Sample Meetup: JVM Performance (Online)',
    description:
      'Placeholder online meetup used to preview the events pages. Online-only (no venue), to exercise that case.',
    date: '2026-07-18',
    startTime: '18:30',
    endTime: '20:00',
    online: true,
    externalUrl: 'https://example.com/online-meetup',
    isSample: true,
  },
  {
    slug: 'sample-meetup-virtual-threads',
    name: 'Sample Meetup: Virtual Threads Hands-on',
    description:
      'Placeholder upcoming meetup used to preview the events pages. Sample hands-on session with Java virtual threads.',
    date: '2026-10-24',
    startTime: '10:00',
    endTime: '13:30',
    venue: 'sample-tech-hub',
    banner: '/Home/event-banner.webp',
    registrationUrl: 'https://example.com/register',
    externalUrl: 'https://example.com/luma-sample',
    isSample: true,
  },
];
