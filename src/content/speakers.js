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
    photo: '/Experts/SpeakerVenkat.webp',
    designation: 'Founder',
    company: 'Agile Developer Inc.',
    rolePrefix: 'Founder of',
  },
  {
    slug: 'vaibhav-choudhary',
    name: 'Vaibhav Choudhary',
    photo: '/Experts/Vaibhav.webp',
    designation: 'JVM Engineer',
    company: 'Salesforce',
  },
  {
    slug: 'jigar-shah',
    name: 'Jigar Shah',
    photo: '/Experts/Jigar.webp',
    designation: 'Director of Engineering',
    company: 'DataOrb',
    rolePrefix: 'Director of Engineering',
    socials: { linkedin: 'https://www.linkedin.com/in/jigar-shah-98006718' },
  },
  {
    slug: 'dhaval-shah',
    name: 'Dhaval Shah',
    photo: '/Experts/Dhaval.webp',
    designation: 'Principal Consulting Architect',
    bio:
      'Fintech and payments infrastructure expert with 20+ years architecting high-scale distributed systems, optimizing provisioning for large user bases.',
    socials: { linkedin: 'https://www.linkedin.com/in/dhavalshah201279/' },
  },
  {
    slug: 'siva-reddy',
    name: 'Siva Reddy',
    photo: '/Experts/Siva.webp',
    designation: 'Developer Advocate',
    company: 'JetBrains',
    bio:
      'Developer Advocate at JetBrains, focusing on empowering the developer community through technical advocacy and engagement.',
    socials: { linkedin: 'https://www.linkedin.com/in/ksivaprasadreddy/' },
  },
  {
    slug: 'vikas-rajput',
    name: 'Vikas Rajput',
    photo: '/Experts/Vikas.webp',
    designation: 'Founder',
    company: 'TechXplore',
    rolePrefix: 'Founder of',
    bio:
      'Founder of Techxplore and a Java Enterprise Architect. He also serves as a Community Manager for JUG Gujarat, empowering developers through knowledge sharing.',
    socials: {
      linkedin: 'https://linkedin.com/in/vikasrajputin',
      x: 'https://x.com/vikasrajputin',
      website: 'https://vikasrajput.in',
    },
  },
  {
    slug: 'rohan-kumar',
    name: 'Rohan Kumar',
    photo: '/Experts/Rohan.webp',
    designation: 'Software Developer',
    company: 'Red Hat',
  },
  {
    slug: 'rajadurai-krishnamoorthy',
    name: 'Rajadurai Krishnamoorthy',
  },
  {
    slug: 'thamaraikkanni-panneerselvam',
    name: 'Thamaraikkanni Panneerselvam',
  },
  {
    slug: 'sathish-kumar',
    name: 'Sathish Kumar',
    bio:
      'A passionate software engineer, open-source contributor, and expert in R&D, backend systems, and data engineering. Sathish brings a wealth of knowledge in C, Java, Python, and building scalable solutions.',
  },
  {
    slug: 'priyanka-shinghala',
    name: 'Priyanka Shinghala',
    designation: 'Java Principal Consultant',
    company: 'Staunchsys',
  },
  {
    slug: 'dhaval-gajjar',
    name: 'Dhaval Gajjar',
    designation: 'System Architect',
    company: 'Staunchsys',
  },
  {
    slug: 'akshay-vadsara',
    name: 'Akshay Vadsara',
  },
  {
    slug: 'bharat-ranpariya',
    name: 'Bharat Ranpariya',
    designation: 'Technical Engineering Manager',
    company: 'Dataorb',
    bio:
      'Bharat is an experienced technical leader with a strong background in software development, team leadership, and project delivery. He has successfully led enterprise-scale projects, improved development efficiency through agile practices, and built scalable cloud-based systems.',
    socials: { linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
  },
  {
    slug: 'niraj-salot',
    name: 'Niraj Salot',
  },
  {
    slug: 'nidhi-arora',
    name: 'Dr. Nidhi Arora',
    designation: 'Co-Founder & Director of AI',
    company: 'Advit',
    socials: { linkedin: 'https://www.linkedin.com/in/nidhi-arora-phd/' },
  },
  {
    slug: 'bhagyesh-radiya',
    name: 'Bhagyesh Radiya',
    designation: 'Team Lead',
    company: '7Span',
    socials: { linkedin: 'https://www.linkedin.com/in/bhagyeshradiya' },
  },
  {
    slug: 'jeemy-patel',
    name: 'Jeemy Patel',
    designation: 'Full Stack Java Team Lead',
    company: '7Span',
    bio:
      'Jeemy Patel is a Full Stack Java Team Lead at 7Span with expertise in Spring Boot, React, microservices, SQL, and AWS. He builds scalable apps and leads end-to-end full stack solutions.',
    socials: { linkedin: 'https://www.linkedin.com/in/jeemy-patel-569929183' },
  },
  {
    slug: 'vaibhav-savaliya',
    name: 'Vaibhav Savaliya',
    designation: 'Lead Software Engineer',
    company: '7Span',
    bio:
      'Vaibhav is an AWS Certified Full-Stack Engineer with 5+ years of experience in Java, React, PostgreSQL & AWS. He leads teams and builds scalable apps with a passion for mentoring developers.',
    socials: { linkedin: 'https://www.linkedin.com/in/vaibhav-savaliya-83a21b11b' },
  },
  {
    slug: 'ketan-bhavsar',
    name: 'Ketan Bhavsar',
    designation: 'Technical Architect',
    bio:
      'Ketan Bhavsar is a Technical Architect with 15+ years of experience across finance, healthcare, trading, and sports tech. Expert in Java, Spring Boot, and microservices, he is now exploring applied AI and prompt engineering to bring intelligence into enterprise systems.',
    socials: { linkedin: 'https://www.linkedin.com/in/ketanbhavsar/' },
  },
  {
    slug: 'milind-mehta',
    name: 'Milind Mehta',
    designation: 'Senior Solution Architect',
    company: 'Hexaware Technologies Ltd.',
    bio:
      'With over 12 years in the banking domain, Milind has led digital transformation initiatives and large-scale enterprise projects. Beyond being a seasoned architect, he’s a lifelong learner exploring AI and ML to shape intelligent financial platforms.',
    socials: { linkedin: 'https://www.linkedin.com/in/milindmehta89', x: 'https://x.com/milindmehta89' },
  },
  {
    slug: 'falgun-bhalsod',
    name: 'Falgun Bhalsod',
    designation: 'DevOps Engineer',
    company: 'Yellow Panther',
    bio:
      'Falgun Bhalsod is a seasoned DevOps Engineer & Cloud Consultant with hands-on expertise across AWS, Azure, and Google Cloud Platform. He specializes in automation, CI/CD pipelines, and scalable infrastructure design.',
    socials: { linkedin: 'https://www.linkedin.com/in/falgunbhalsod/', x: 'https://x.com/falgunbhalsodb' },
  },
  {
    slug: 'tanvir-dhanani',
    name: 'Tanvir Dhanani',
    designation: 'Senior Backend Developer',
    company: 'IBM India Pvt. Ltd.',
    bio:
      'Tanvir Dhanani is a seasoned Java developer with 9+ years of experience building high-performance backend services and APIs across diverse industries. Currently at IBM India Pvt. Ltd., he specializes in writing clean, maintainable code, optimizing application performance, and mentoring teams in Java, Spring Boot, and modern design practices.',
    socials: { linkedin: 'http://www.linkedin.com/in/tanvirdhanani', x: 'https://x.com/tanvirdhanani' },
  },
  {
    slug: 'divyeshkumar-prajapati',
    name: 'Divyeshkumar Prajapati',
    designation: 'Assistant Consultant',
    company: 'TCS',
    bio:
      'Divyeshkumar Prajapati is an Assistant Consultant at TCS and a seasoned Java professional with a strong interest in building scalable applications. He is passionate about APIs, Cloud technologies, and the growing intersection of AI with modern software development.',
    socials: { linkedin: 'https://www.linkedin.com/in/divyeshprajapati1010' },
  },
  {
    slug: 'aniket-datt',
    name: 'Aniket Datt',
    designation: 'Senior Software Engineer',
    company: 'Thomson Reuters',
    bio:
      'Aniket specializes in Java, Spring Boot, and Azure, focusing on system modernization and AI-driven microservices. He recently won at the Thomson Reuters Global AI Hackathon 2025 and is passionate about building resilient, intelligent systems using modern AI architectures.',
    socials: { linkedin: 'https://www.linkedin.com/in/aniket-datt' },
  },
  {
    slug: 'ashish-vaghela',
    name: 'Ashish Vaghela',
    designation: 'Software Crafter',
    company: 'Nelkinda Software Craft',
  },
  {
    slug: 'ronald-dehuysser',
    name: 'Ronald Dehuysser',
    designation: 'Founder',
    company: 'JobRunr BV',
    socials: { linkedin: 'https://www.linkedin.com/in/ronalddehuysser' },
  },
  {
    slug: 'vinayak-joglekar',
    name: 'Vinayak Joglekar',
    bio:
      '40 years of IT experience and a serial entrepreneur. He specializes in harnessing agentic AI to transform product delivery, scale operations, and drive innovation.',
    socials: { linkedin: 'https://www.linkedin.com/in/vinayak-joglekar-b95329/' },
  },
];
