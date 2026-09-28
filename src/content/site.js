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
  joinUrl: 'https://linktr.ee/juggujarat',
  volunteerFormUrl: 'https://forms.gle/TQrY7pC7k7heAw87A',
  lumaCalendarUrl: 'https://luma.com/juggujarat',
  lumaIcsUrl: 'https://api.lu.ma/ics/get?entity=calendar&id=cal-9GeA8E6xpITOUpi',
  timeZone: 'Asia/Kolkata',
  stats: {
    members: '500',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/juggujarat/',
    x: 'https://x.com/juggujarat',
    whatsapp: 'https://chat.whatsapp.com/I3W75ItQTNs7Hr7WzRWcPR',
    youtube: 'https://www.youtube.com/@juggujarat',
  },
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
