// Venue partners — organisations whose premises host our meetups/conferences.
// Each record is both the partner (name/logo/website) and the place
// (address/city/map). Events and conferences point here by slug
// (`venue` / `venues[]`); a venue's hosting history is derived via
// getVenueHistory() in selectors.js. For a one-off place that is NOT a
// partner, use an inline `location` on the event instead (see events.js).
//
// Fields:
//   slug, name, logo, website, description        partner info
//   address, city                                 place info
//   mapUrl?, mapEmbedUrl?, image?, logoAlt?, isSample?

export const venues = [
  {
    slug: 'lj-university',
    name: 'LJ University',
    logo: '/Img/LJ_Logo.svg',
    logoAlt: 'LJ Logo',
    image: '/Img/LJ_Campus.svg',
    website: 'https://ljku.edu.in/',
    description: 'A hub for future-ready talent and cutting-edge technology learning.',
    // Only address text present in the repo (AboutEvent.jsx); replace with the
    // full street address when known.
    address: 'LJ University, Ahmedabad',
    city: 'Ahmedabad',
    mapUrl: 'https://maps.app.goo.gl/PCQEcveVpwxk9YdD8',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3672.9108100708986!2d72.485711!3d22.990307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9aee6c89a621%3A0x872df2d55fbb0008!2sLJ%20University!5e0!3m2!1sen!2sin!4v1744317485542!5m2!1sen!2sin',
  },
  {
    slug: 'gujarat-university-cpc',
    name: 'Gujarat University Centre For Professional Courses',
    logo: '/Img/gujarat-university-cpc.webp',
    website: 'https://gucpc.in/',
    address: 'Centre for Professional Courses Department, Gujarat University, Ahmedabad',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps?q=23.038873494473062,72.54532835582141',
    mapEmbedUrl: 'https://www.google.com/maps?q=23.038873494473062,72.54532835582141&output=embed',
  },
  {
    slug: 'staunchsys',
    name: 'Staunchsys IT Services Pvt. Ltd.',
    address: 'Staunchsys IT Services Pvt. Ltd., 410-413, Aaron Spectra Behind Rajpath club, Rajpath Rangoli Road, Sarkhej - Gandhinagar Hwy, Bodakdev, Ahmedabad, Gujarat 380054, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.033914,72.504981',
  },
  {
    slug: '7span',
    name: '7Span',
    website: 'https://7span.com/',
    address: '7Span, 201, Isquare Corporate Park, Science City Rd, Science City, Panchamrut Bunglows II, Sola, Ahmedabad, Gujarat 380060, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.070849,72.517664',
  },
  {
    slug: 'smartsense',
    name: 'smartSense Consulting Solutions Pvt. Ltd',
    address: 'smartSense Consulting Solutions Pvt. Ltd, 4th Floor, GIFT One, Gujarat International Finance Tec-City, Gandhinagar, Gujarat 382050, India',
    city: 'Gandhinagar',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.1644923,72.6801305',
  },
  {
    slug: 'york-ie',
    name: 'York IE APAC Pvt Ltd',
    address: 'York IE APAC Pvt Ltd, 2nd floor Eastface, Iscon, Ambli Rd, behind Maruti Suzuki Arena, Ambli, Ahmedabad, Gujarat 380058, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.0244203,72.4787312',
  },
  {
    slug: 'aubergine',
    name: 'Aubergine Solutions Pvt. Ltd.',
    address: 'Aubergine Solutions Pvt. Ltd., A2, Tenth Floor, Safal Profitaire, Corporate Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.0096067,72.5062465',
  },
  {
    slug: 'intech',
    name: 'INTECH',
    address: 'INTECH, Tower 1 Ground Floor, Infocity IT, 1-A, Infocity, Gandhinagar, Gujarat 382007, India',
    city: 'Gandhinagar',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.1934387,72.6377256',
  },
  {
    slug: 'royal-technosoft',
    name: 'Royal Technosoft P Limited',
    website: 'https://royaltechnosoft.com',
    address: 'Royal Technosoft P Limited, 2nd and 3rd floor, Surbhi Complex, Chimanlal Girdharlal Rd, Opposite Municipal Market, Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.0340189,72.5601384',
  },
  {
    slug: 'silver-oak-college',
    name: 'Silver Oak College of Engineering and Technology',
    address: 'Silver Oak College Of Engineering And Technology Class Room, Gota, Ahmedabad, Gujarat 382481, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.0901508,72.535029',
  },
  {
    slug: 'ibm-isl-gift-city',
    name: 'IBM ISL, GIFT City',
    address: 'IBM ISL, GIFT City, Floor 18-20, Prestige Fintech, Gujarat International Finance Tec-City, Gujarat 382050, India',
    city: 'Gandhinagar',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.164987,72.6852203',
  },
  {
    slug: 'caffix',
    name: 'Caffix - The Tech Cafe',
    address: 'Caffix- The Tech Cafe, Third Floor, 301, Soham Pristine, above Vadilal Happiness, PRL Colony, Thaltej, Ahmedabad, Gujarat 380059, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.0449837,72.4986407',
  },
  {
    slug: 'ignek',
    name: 'IGNEK - Liferay Boutique Company',
    website: 'https://www.ignek.com/',
    address: 'IGNEK - Liferay Boutique Company, E 910-912, Ganesh Glory 11, Jagatpur Road, Sarkhej - Gandhinagar Hwy, Jagatpur, Ahmedabad, Gujarat 382470, India',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=23.1129181,72.5403577',
  },
];
