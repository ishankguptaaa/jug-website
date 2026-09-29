// Community-wide settings: name, stats, social links, featured content.
// Plain data only — no React, no window/document (must stay SSR-safe).

export const site = {
  name: 'Gujarat JUG',
  fullName: 'Gujarat Java User Group',
  tagline: 'Connect , Code , Learn',
  description:
    'Gujarat Java User Group (JUG) is a thriving community of Java developers, tech enthusiasts, and industry professionals. Join us to learn, network, and grow!',
  url: 'https://www.gujaratjug.org',
  logo: '/Home/community-logo.svg',
  // Default social-share image (raster; SVG isn't supported by most OG consumers).
  ogImage: '/Img/AboutCommunity.png',
  joinUrl: 'https://linktr.ee/juggujarat',
  volunteerFormUrl: 'https://forms.gle/TQrY7pC7k7heAw87A',
  lumaCalendarUrl: 'https://luma.com/juggujarat',
  lumaIcsUrl: 'https://api.lu.ma/ics/get?entity=calendar&id=cal-9GeA8E6xpITOUpi',
  timeZone: 'Asia/Kolkata',
  // Shown in the footer until the client computes the current IST year.
  copyrightStartYear: 2025,
  stats: {
    members: '500',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/juggujarat/',
    x: 'https://x.com/juggujarat',
    whatsapp: 'https://chat.whatsapp.com/I3W75ItQTNs7Hr7WzRWcPR',
    youtube: 'https://www.youtube.com/@juggujarat',
  },
  // TODO: replace with the real "What is Gujarat JUG" copy (sample text).
  about:
    'Gujarat JUG is a community of Java developers, architects, students and technology enthusiasts who meet to learn from each other, share experience and grow together.',
  // TODO: replace with the real mission statement (sample text).
  mission:
    'To help Java developers in Gujarat learn, connect and contribute, through free meetups, workshops and conferences open to everyone.',
  // TODO: replace with the real milestones; add a `year` to each once confirmed (sample text).
  milestones: [
    { title: 'A community is born', body: 'A few Java enthusiasts start meeting to share what they learn.' },
    { title: 'Meetups take off', body: 'Regular meetups and workshops bring in speakers and members from across the region.' },
    { title: 'Community Day for Java', body: 'Our first flagship conference brings the community together for a full day of talks.' },
  ],
  // Speaker slugs shown in the home page "Here Come the Experts!" section, in order.
  featuredSpeakers: ['siva-reddy', 'vikas-rajput', 'vaibhav-choudhary', 'rohan-kumar'],
  // YouTube embeds shown in the home page "Our Sessions" section, in order.
  // Talk titles/speakers for these recordings are not in the repo yet, so they
  // are kept as plain videos rather than session records.
  featuredVideos: [
    { embedUrl: 'https://www.youtube.com/embed/65jLZYSIB3A?si=ePFhouw1u49R6grn' },
    { embedUrl: 'https://www.youtube.com/embed/5z53EUXWjtU?si=9BJdbWhAxrAVxi8s' },
  ],
};
