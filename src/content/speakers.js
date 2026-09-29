// Speakers — one record per person, referenced by slug from sessions.js
// and site.js (featuredSpeakers). A speaker's talks are derived via selectors;
// never copy a speaker's name/photo into an event or session.
//
// Fields:
//   slug         kebab-case, stable (used in /speakers/:slug)
//   name         display name (mixed case)
//   photo?       root-relative path under public/ (missing → initials avatar)
//   designation  job title, e.g. 'JVM Engineer'
//   company      organisation, e.g. 'Salesforce'
//   rolePrefix?  optional text shown before the company on cards; defaults to
//                `${designation} at` (see getSpeakerRolePrefix in selectors.js)
//   bio?         short bio (only real, sourced text — never invented)
//   socials?     { linkedin?, x?, github?, website? }
//   isSample?    true for placeholder records

export const speakers = [
  {
    slug: 'venkat-subramaniam',
    name: 'Venkat Subramaniam',
    photo: '/Experts/SpeakerVenkat.png',
    designation: 'Founder',
    company: 'Agile Developer Inc.',
    rolePrefix: 'Founder of',
  },
  {
    slug: 'vaibhav-choudhary',
    name: 'Vaibhav Choudhary',
    photo: '/Experts/Vaibhav.png',
    designation: 'JVM Engineer',
    company: 'Salesforce',
  },
  {
    slug: 'jigar-shah',
    name: 'Jigar Shah',
    photo: '/Experts/Jigar.png',
    designation: 'Director of Engineering',
    company: 'DataOrb',
    rolePrefix: 'Director of Engineering',
  },
  {
    slug: 'dhaval-shah',
    name: 'Dhaval Shah',
    photo: '/Experts/Dhaval.png',
    designation: 'Principal Software Engineer',
    company: 'Mastercard',
    rolePrefix: 'Principal Software Engineer',
  },
  {
    slug: 'siva-reddy',
    name: 'Siva Reddy',
    photo: '/Experts/Siva.png',
    designation: 'Developer Advocate',
    company: 'JetBrains',
  },
  {
    slug: 'vikas-rajput',
    name: 'Vikas Rajput',
    photo: '/Experts/Vikas.png',
    designation: 'Sr. Java Consultant',
    company: 'TechXplore',
  },
  {
    slug: 'rohan-kumar',
    name: 'Rohan Kumar',
    photo: '/Experts/Rohan.png',
    designation: 'Software Developer',
    company: 'Red Hat',
  },

  // ---- Sample speakers (placeholders — replace with real people) ----
  {
    slug: 'sample-speaker-asha',
    name: 'Asha Sample',
    designation: 'Sample Backend Engineer',
    company: 'Example Corp',
    bio: 'Placeholder speaker used to preview the new event pages. Not a real person.',
    isSample: true,
  },
  {
    slug: 'sample-speaker-rahul',
    name: 'Rahul Placeholder',
    designation: 'Sample Java Architect',
    company: 'Example Labs',
    bio: 'Placeholder speaker used to preview the new event pages. Not a real person.',
    isSample: true,
  },
  {
    slug: 'sample-speaker-meera',
    name: 'Meera Demo',
    designation: 'Sample Developer Advocate',
    company: 'Demo Systems',
    bio: 'Placeholder speaker used to preview the new event pages. Not a real person.',
    isSample: true,
  },
];
