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
  {
    slug: 'mastering-java-latest-updates',
    name: 'Mastering Java Latest Updates',
    description:
      'An in-depth, interactive online event taking a deep dive into the latest updates in Java, covering versions 9 through 22. Covers the key features, enhancements and improvements of each version with practical use cases and real-world examples.',
    date: '2024-09-14',
    startTime: '11:00',
    endTime: '12:30',
    online: true,
    banner: '/events/mastering-java-latest-updates/cover.webp',
    externalUrl: 'https://luma.com/a49v06y8',
  },
  {
    slug: 'building-modular-monoliths-using-spring-modulith',
    name: 'Building Modular Monoliths Using Spring Modulith',
    description:
      'Online meetup hosted by Java User Group Gujarat, Vikas Rajput and Bharat Ranpariya.',
    date: '2024-09-29',
    startTime: '10:00',
    endTime: '11:30',
    online: true,
    banner: '/events/building-modular-monoliths-using-spring-modulith/cover.webp',
    externalUrl: 'https://luma.com/tw7wx50t',
  },
  {
    slug: 'boosting-application-performance-with-modern-java',
    name: 'Boosting Application Performance with Modern Java',
    description:
      'Discover how the latest innovations in JDK 21 improve application performance, from Virtual Threads and Class Data Sharing to modern garbage collectors. Includes real-time demos of the gains when moving from JDK 11 to JDK 21.',
    date: '2024-10-12',
    startTime: '11:00',
    endTime: '12:30',
    online: true,
    banner: '/events/boosting-application-performance-with-modern-java/cover.webp',
    externalUrl: 'https://luma.com/70uh1jyy',
  },
  {
    slug: 'hacktoberfest-special-kickstart-your-open-source-journey',
    name: 'Hacktoberfest Special: Kickstart Your Open Source Journey!',
    description:
      'A Hacktoberfest session to help Java developers start contributing to open source. Covers the benefits, a step-by-step guide to a first contribution, common mistakes to avoid and a live contribution demo.',
    date: '2024-10-20',
    startTime: '11:00',
    endTime: '12:30',
    online: true,
    banner: '/events/hacktoberfest-special-kickstart-your-open-source-journey/cover.webp',
    externalUrl: 'https://luma.com/qnf7vacq',
  },
  {
    slug: 'unlock-the-future-powering-machine-learning-in-java',
    name: 'Unlock the Future: Powering Machine Learning in Java',
    description:
      'A deep dive into JSR 381, the API bringing machine learning capabilities to Java applications. Includes use cases and a hands-on demo of building data-driven solutions with Java libraries.',
    date: '2024-12-14',
    startTime: '11:00',
    endTime: '13:00',
    online: true,
    banner: '/events/unlock-the-future-powering-machine-learning-in-java/cover.webp',
    externalUrl: 'https://luma.com/gece5k03',
  },
  {
    slug: 'missing-pieces-in-java-persistence-puzzle',
    name: 'Missing Pieces in Java Persistence Puzzle',
    description:
      'Explores the key gaps in traditional Java persistence solutions and strategies to overcome them. From a database-first approach to type safety and productivity, learn how to build scalable applications for the modern era.',
    date: '2025-01-19',
    startTime: '12:00',
    endTime: '13:45',
    online: true,
    banner: '/events/missing-pieces-in-java-persistence-puzzle/cover.webp',
    externalUrl: 'https://luma.com/ro4cgjqu',
  },
  {
    slug: 'march-meetup-2025',
    name: 'March Meetup (In-person)',
    description:
      'An in-person March meetup in Ahmedabad with two talks: Mastering Java Latest Updates (Java 9 to 23) and The Art of Dockerizing Java Apps.',
    date: '2025-03-22',
    startTime: '10:00',
    endTime: '12:00',
    venue: 'staunchsys',
    banner: '/events/march-meetup-2025/cover.webp',
    externalUrl: 'https://luma.com/fzg27b5z',
  },
  {
    slug: 'april-meetup-2025',
    name: 'April Meetup (In-person)',
    description:
      'Another Java meetup with two sessions: Reactive Programming in Java and The Secret Sauce of Rapid Java Fullstack Development.',
    date: '2025-04-12',
    startTime: '10:00',
    endTime: '12:00',
    venue: '7span',
    banner: '/events/april-meetup-2025/cover.webp',
    externalUrl: 'https://luma.com/i5c7n0vz',
  },
  {
    slug: 'java-turns-30',
    name: 'Java Turns 30: Celebrating Three Decades of Innovation',
    description:
      'A special meetup celebrating 30 years of Java, packed with knowledge, stories and inspiration. Includes a talk, an open mic to share your Java story and a birthday celebration.',
    date: '2025-05-24',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'smartsense',
    banner: '/events/java-turns-30/cover.webp',
    externalUrl: 'https://luma.com/gvw2d6bb',
  },
  {
    slug: 'java-meetup-june-2025',
    name: 'Java Meetup: June Edition',
    description:
      'The Gujarat Java User Group June meetup, with a session on migration engineering as code with OpenRewrite and a panel discussion on becoming an AI-proof engineer.',
    date: '2025-06-28',
    startTime: '10:30',
    endTime: '13:00',
    venue: 'york-ie',
    banner: '/events/java-meetup-june-2025/cover.webp',
    externalUrl: 'https://luma.com/z29ex52v',
  },
  {
    slug: 'july-java-meetup-junior-dev-workshop',
    name: 'July Java Meetup: Junior Dev Special Workshop',
    description:
      'A hands-on workshop for junior Java developers on deploying full-stack applications built with Spring Boot and React on AWS. Covers containerization, CI/CD pipelines and basic monitoring.',
    date: '2025-07-26',
    startTime: '09:30',
    endTime: '13:00',
    venue: '7span',
    banner: '/events/july-java-meetup-junior-dev-workshop/cover.webp',
    externalUrl: 'https://luma.com/83mxssc0',
  },
  {
    slug: 'building-rag-with-spring-ai',
    name: 'Building RAG with Spring AI',
    description:
      'Learn to build Retrieval-Augmented Generation (RAG) applications with Spring AI, combining Large Language Models with vector databases for intelligent, data-driven responses.',
    date: '2025-08-30',
    startTime: '10:00',
    endTime: '12:00',
    venue: 'staunchsys',
    banner: '/events/building-rag-with-spring-ai/cover.webp',
    externalUrl: 'https://luma.com/sjxn25t8',
  },
  {
    slug: 'java-for-ai-build-your-own-mcp-server-with-spring-ai',
    name: 'Java for AI: Build Your Own MCP Server with Spring AI',
    description:
      'Introduces the Model Context Protocol (MCP): what it is, why it matters and how to implement it in real-world projects using Java and Spring AI. A step-by-step, hands-on session.',
    date: '2025-09-20',
    startTime: '10:30',
    endTime: '12:30',
    venue: 'york-ie',
    banner: '/events/java-for-ai-build-your-own-mcp-server-with-spring-ai/cover.webp',
    externalUrl: 'https://luma.com/3qgxk50z',
  },
  {
    slug: 'build-and-scale-modern-java-fullstack-app-on-gcp',
    name: 'Build & Scale Modern Java Fullstack App on GCP: Workshop',
    description:
      'A hands-on workshop on containerizing, scaling and managing full-stack Java applications on Google Cloud Platform, from code to scalable cloud deployment.',
    date: '2025-10-11',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'smartsense',
    banner: '/events/build-and-scale-modern-java-fullstack-app-on-gcp/cover.webp',
    externalUrl: 'https://luma.com/b96gm7sd',
  },
  {
    slug: 'java-25-virtual-threads',
    name: 'Java 25 Virtual Threads',
    description:
      'Discover how Java 25 Virtual Threads (Project Loom) transform the way modern applications handle concurrency. Learn how they work and how to adopt them in existing Java codebases.',
    date: '2025-12-20',
    startTime: '10:00',
    endTime: '12:00',
    venue: 'aubergine',
    banner: '/events/java-25-virtual-threads/cover.webp',
    externalUrl: 'https://luma.com/g8pj5etw',
  },
  {
    slug: 'java-25-unveiled-elevating-developer-experience',
    name: 'Java 25 Unveiled: Elevating Developer Experience',
    description:
      'An overview of the most impactful enhancements in Java 25 (LTS), covering Project Amber, Loom, Leyden and Panama. Makes Java more expressive, scalable and cloud-ready.',
    date: '2026-01-31',
    startTime: '10:30',
    endTime: '12:30',
    venue: 'intech',
    banner: '/events/java-25-unveiled-elevating-developer-experience/cover.webp',
    externalUrl: 'https://luma.com/02vhse1w',
  },
  {
    slug: 'powering-smart-ai-with-java',
    name: 'Powering Smart AI with Java',
    description:
      'A hands-on session on modern AI search architectures: embeddings, vector databases and RAG with Java, with real-world enterprise use cases.',
    date: '2026-02-21',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'royal-technosoft',
    banner: '/events/powering-smart-ai-with-java/cover.webp',
    externalUrl: 'https://luma.com/sw4vxpkw',
  },
  {
    slug: 'building-intelligent-agents-with-java',
    name: 'Building Intelligent Agents with Java',
    description:
      'A deep dive into Agentic AI: build autonomous AI agents that understand natural language, make decisions and execute real functions within your Java ecosystem. No prior AI/ML knowledge is required.',
    date: '2026-04-25',
    startTime: '10:30',
    endTime: '12:30',
    venue: 'silver-oak-college',
    banner: '/events/building-intelligent-agents-with-java/cover.webp',
    externalUrl: 'https://luma.com/6srbaxy7',
  },
  {
    slug: 'java-21-migration-playbook',
    name: 'The Java 21 Migration Playbook: Moving Safely from 11 to 21',
    description:
      'A developer-centric session on moving an existing codebase from Java 11 to Java 21 safely and without breaking production. Also celebrates Java’s birthday with a cake-cutting session.',
    date: '2026-05-30',
    startTime: '09:45',
    endTime: '12:00',
    venue: 'ibm-isl-gift-city',
    banner: '/events/java-21-migration-playbook/cover.webp',
    externalUrl: 'https://luma.com/9kn2leb7',
  },
  {
    slug: 'agentic-enterprise-ai-driven-product-engineering',
    name: 'Agentic Enterprise & AI-Driven Product Engineering: Practical Learning',
    description:
      'A hands-on workshop on building products end to end with AI agents, from requirements to test-driven development with Claude. Bring your laptop for the practical session.',
    date: '2026-06-27',
    startTime: '10:45',
    endTime: '13:00',
    venue: 'caffix',
    banner: '/events/agentic-enterprise-ai-driven-product-engineering/cover.webp',
    externalUrl: 'https://luma.com/q9rccqdb',
  },
  {
    slug: 'java-september-meetup-2026',
    name: 'Java September Meetup',
    description:
      'Two practical sessions covering Java performance, libraries and job scheduling. Open to students, junior developers, QA engineers and experienced Java developers.',
    date: '2026-09-26',
    startTime: '10:30',
    endTime: '13:00',
    venue: 'ignek',
    banner: '/events/java-september-meetup-2026/cover.webp',
    externalUrl: 'https://luma.com/2dja95on',
  },
];
