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
  // Footer shows © this year – current IST year (never earlier than this).
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
  about:
    'Gujarat Java User Group (Gujarat JUG) is a thriving community of Java developers, architects, students, and technology enthusiasts passionate about learning, sharing, and growing together.',
  mission:
    'Our mission is to empower Java professionals, promote best practices, and create a platform where developers can connect, collaborate, and innovate.',
  // TODO: set to false once the milestones / whatWeDo / nonCommercial / participate copy below is real.
  aboutCopyIsSample: true,

  // TODO: replace with the real milestones (sample text; no dates until confirmed).
  milestones: [
    { title: 'A community is born', body: 'A few Java enthusiasts start meeting to share what they learn.' },
    { title: 'Meetups take off', body: 'Regular meetups and workshops bring in speakers and members.' },
    { title: 'Community Day for Java', body: 'Our flagship conference brings the community together for a day of talks.' },
  ],
  // TODO: replace with the real descriptions (sample text).
  whatWeDo: {
    meetups: 'Regular sessions where developers share what they are building and learning.',
    workshops: 'Hands-on sessions where you write code alongside people who use the tools every day.',
    conferences: 'Community conferences with talks, workshops and time to meet other developers.',
  },
  // TODO: replace with the real statement (sample text).
  nonCommercial: 'We are a community-driven, non-commercial group, run by volunteers.',
  // TODO: replace with the real "get involved" copy (sample text).
  participate: {
    attend: 'Come along to a meetup or conference, and follow our Luma calendar so you never miss one.',
    speak: 'Have something to share? Submit a talk while a call for papers is open.',
    speakClosed: 'Speaking slots open with each call for papers. Get in touch and we will let you know.',
    host: 'Have a venue and want to host a meetup? See our venue partners.',
    join: 'Chat with fellow Java developers and hear about events first.',
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
