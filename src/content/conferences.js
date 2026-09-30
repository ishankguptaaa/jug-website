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
//   heroLogo?                   { src, width, height, srcSm, widthSm, heightSm } hero wordmark art
//   featuredSpeaker?            { speaker: <speaker slug>, image, width, height, imageSm, widthSm, heightSm } hero cut-out
//   aboutImage?                 { src, width, height } illustration next to the About text
//   goodies[]?                  [{ image, text }] "More Than Just Talks" perks
//   sponsorship?                { deckEmbedUrl, phone } sponsorship pitch section
//   cfp?                        { url, closesOn? ('YYYY-MM-DD') } call for papers
//   tracks[]                    [{ slug, name }]
//   highlights[]                short bullet strings
//   stats                       { attendees, speakers? } (display strings; speakers = expected count before the lineup is announced)
//   volunteers[]?               [{ name, role, company, image, linkedin? }] "Our Rockstar Volunteer" team
//   announcements[]             [{ date, title, body }]
//   sponsors[]                  [{ sponsor: <sponsor slug>, tier: 'platinum'|'gold'|'silver'|'community-supporter' }]
//   partners[]                  sponsor slugs of kind 'jug' / 'community', in display order
//   statusOverride?             'upcoming' | 'live' | 'completed'
//   isSample?
//
// Sessions point at a conference via `conference: <slug>` (sessions.js);
// speakers are derived from those sessions.

// Slug of the flagship conference (/community-day-for-java-2025 redirects to its page).
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
    banner: '/Home/community-banner.webp',
    registrationUrl: 'https://konfhub.com/community-day-for-java-2025',
    heroLogo: {
      src: '/Home/CommunityDayJava.svg',
      width: 492,
      height: 249,
      srcSm: '/Home/CommunityDayJavaSm.svg',
      widthSm: 206,
      heightSm: 104,
    },
    featuredSpeaker: {
      speaker: 'venkat-subramaniam',
      image: '/Home/VenkatXl.webp',
      width: 358,
      height: 318,
      imageSm: '/Home/VenkatSm.webp',
      widthSm: 210,
      heightSm: 202,
    },
    aboutImage: { src: '/Img/AboutEvent.webp', width: 1133, height: 1150 },
    goodies: [
      { image: '/Goodies/Food.webp', text: 'Delicious Food & Breakfast Included – Fuel up while networking!' },
      { image: '/Goodies/Bag.webp', text: 'Exclusive Swags & Goodies – Walk away with special event memorabilia!' },
      {
        image: '/Goodies/Speakers.webp',
        text: 'Technical Talks from Industry Experts – Get insights from top minds in Java.',
      },
    ],
    sponsorship: {
      deckEmbedUrl:
        'https://docs.google.com/presentation/d/1e_eKQ3kvR7318PCQNxNNsJrsshI9mq9Qi-bLz2UO_aA/embed?start=true&loop=true&delayms=3000',
      phone: '98794 83841',
    },
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
    },
    announcements: [],
    volunteers: [
      { name: 'Dhaval Gajjar', role: 'System Architect', company: 'Staunchsys IT Services', image: '/Volunteer/Dhaval.webp', linkedin: 'https://www.linkedin.com/in/dhavalgajjarin/' },
      { name: 'Vikas Rajput', role: 'Sr. Java Consultant', company: 'TechXplore IT Solutions', image: '/Volunteer/Vikas.webp', linkedin: 'https://www.linkedin.com/in/vikasrajputin/' },
      { name: 'Bharat Ranpariya', role: 'Team Lead', company: 'Thomson Reuters', image: '/Volunteer/Bharat.webp', linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
      { name: 'Daman Singh Rajput', role: 'Java FullStack Developer', company: 'TechXplore IT Solutions', image: '/Volunteer/Damansingh.webp', linkedin: 'https://www.linkedin.com/in/daman-singh-rajput-2a1ba4237/' },
      { name: 'Harshvardhan Parmar', role: 'LFX\'25 Mentee', company: 'Microcks', image: '/Volunteer/Harsh.webp', linkedin: 'https://www.linkedin.com/in/harshvardhan-parmar/' },
      { name: 'Vinay Rajput', role: 'Sr. Visual Designer', company: 'Apexure India', image: '/Volunteer/Vinay.webp', linkedin: 'https://www.linkedin.com/in/vinay21496/' },
      { name: 'Meet Patel', role: 'Student', company: 'Royal Technosoft', image: '/Volunteer/Meet.webp', linkedin: 'https://www.linkedin.com/in/meet-patel-1b30a5255/' },
      { name: 'Dubey Saurav', role: 'Graphic Designer', company: 'Gujarat University', image: '/Volunteer/Sourav.webp' },
      { name: 'Kevin Gokani', role: 'Java Developer', company: 'Qatar Airways', image: '/Volunteer/Kevin.webp', linkedin: 'https://www.linkedin.com/in/kevin-gokani/' },
      { name: 'Shalin Sabuwala', role: 'Java Developer', company: 'Sanctuary Technologies', image: '/Volunteer/Shalin.webp', linkedin: 'https://www.linkedin.com/in/shalin-sabuwala/' },
      { name: 'Harshit Gajjar', role: 'Graphic Designer', company: 'Indus university', image: '/Volunteer/Harshit.webp' },
      { name: 'Akshay Vadsara', role: 'Java Head', company: '7Span', image: '/Volunteer/Akshay.webp', linkedin: 'https://www.linkedin.com/in/akshay-vadsara/' },
      { name: 'Pravin Jain', role: 'Java Trainer and Evangelist', company: 'Zen Softech Private Limited', image: '/Volunteer/Pravin.webp', linkedin: 'https://www.linkedin.com/in/jainpravin/' },
      { name: 'Sandip Godhani', role: 'Student', company: 'LJ university', image: '/Volunteer/Sandip.webp', linkedin: 'https://www.linkedin.com/in/sandip-godhani-836294311/' },
      { name: 'Ravi Soni', role: '2x AWS & Cloud Architect', company: 'Rishabh Software Pvt Ltd', image: '/Volunteer/Ravi.webp', linkedin: 'https://www.linkedin.com/in/rvsoni/' },
      { name: 'Aryan Gajjar', role: 'Student', company: 'Swarrnim Startup & Innovation University', image: '/Volunteer/Aryan.webp', linkedin: 'https://www.linkedin.com/in/aryangajjar/' },
      { name: 'Jayesh Gupta', role: 'Software Engineer', company: 'Tata Consultancy Services', image: '/Volunteer/Jayesh.webp', linkedin: 'https://www.linkedin.com/in/jayeshgupta91/' },
    ],
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
