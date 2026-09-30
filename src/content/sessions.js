// Sessions — talks, workshops, panels, keynotes, plus non-talk agenda slots
// (registration, opening, breaks) so a full schedule can be rendered.
// A session points to its speakers (slugs) and to ONE of `event` or `conference`.
// Speaker talk lists and event/conference speaker lists are derived in selectors.js.
//
// Fields:
//   slug, title
//   description?
//   speakers[]      speaker slugs (empty for non-talk slots)
//   event?          event slug        } exactly one of these
//   conference?     conference slug   }
//   track?          track slug (from the conference's tracks[])
//   type            'talk' | 'workshop' | 'panel' | 'keynote'
//                   | 'registration' | 'opening' | 'break'
//   date            'YYYY-MM-DD' — required for conference sessions (multi-day
//                   scheduling); optional for event sessions (defaults to the
//                   event's date via getSessionDate() in selectors.js)
//   startTime, endTime   'HH:mm' IST, 24h (optional for meetup talks without a known slot; both or neither)
//   room?, slidesUrl?, videoUrl?, repoUrl?
//   isSample?

export const SPEAKER_SESSION_TYPES = ['talk', 'workshop', 'panel', 'keynote'];
export const AGENDA_SESSION_TYPES = ['registration', 'opening', 'break'];
export const SESSION_TYPES = [...SPEAKER_SESSION_TYPES, ...AGENDA_SESSION_TYPES];

export const sessions = [
  // ---- Community Day for Java 2025 (in schedule order) ----
  {
    slug: 'cdj-2025-registrations',
    title: 'Registrations + Refreshments',
    description: 'Get settled, grab your badges, and network over a cup of chai! ☕',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'registration',
    startTime: '07:30',
    endTime: '09:00',
  },
  {
    slug: 'cdj-2025-opening',
    title: 'Opening Session',
    description: 'Kickstarting the day with an introduction to the event and what’s in store! 🎤',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'opening',
    startTime: '09:00',
    endTime: '09:15',
  },
  {
    slug: 'cdj-2025-using-ai-to-create-functional-style-code',
    title: 'Using AI to create Functional Style Code',
    speakers: ['venkat-subramaniam'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '09:15',
    endTime: '10:45',
  },
  {
    slug: 'cdj-2025-run-java-application-like-never-before',
    title: 'Run Java Application Like Never Before',
    speakers: ['vaibhav-choudhary'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '10:50',
    endTime: '11:45',
  },
  {
    slug: 'cdj-2025-lunch',
    title: 'Lunch Break',
    description: 'Refuel and connect with fellow Java enthusiasts!',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'break',
    startTime: '11:45',
    endTime: '13:00',
  },
  {
    slug: 'cdj-2025-context-aware-ai-spring-boot-langchain4j',
    title:
      'Craft Context Aware AI Application using Spring Boot - A Deep Dive into LangChain4j and Vector Search',
    speakers: ['jigar-shah'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '13:00',
    endTime: '13:55',
  },
  {
    slug: 'cdj-2025-chaos-engineering-primer',
    title: 'Chaos Engineering – A Primer with Working Demo',
    speakers: ['dhaval-shah'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '14:00',
    endTime: '14:55',
  },

  // ---- Community meetups (imported from Luma) ----
  {
    slug: 'unlock-the-future-powering-machine-learning-in-java',
    title: 'Unlock the Future: Powering Machine Learning in Java',
    speakers: ['rajadurai-krishnamoorthy', 'thamaraikkanni-panneerselvam'],
    event: 'unlock-the-future-powering-machine-learning-in-java',
    type: 'talk',
    startTime: '11:00',
    endTime: '13:00',
  },
  {
    slug: 'missing-pieces-in-java-persistence-puzzle',
    title: 'Missing Pieces in Java Persistence Puzzle',
    speakers: ['sathish-kumar'],
    event: 'missing-pieces-in-java-persistence-puzzle',
    type: 'talk',
    startTime: '12:00',
    endTime: '13:45',
  },
  {
    slug: 'march-meetup-2025-mastering-java-latest-updates',
    title: 'Mastering Java Latest Updates',
    speakers: ['priyanka-shinghala'],
    event: 'march-meetup-2025',
    type: 'talk',
  },
  {
    slug: 'march-meetup-2025-dockerizing-java-apps',
    title: 'The Art of Dockerizing Java Apps',
    speakers: ['dhaval-gajjar'],
    event: 'march-meetup-2025',
    type: 'talk',
  },
  {
    slug: 'april-meetup-2025-reactive-programming-in-java',
    title: 'Reactive Programming in Java',
    speakers: ['akshay-vadsara'],
    event: 'april-meetup-2025',
    type: 'talk',
  },
  {
    slug: 'april-meetup-2025-rapid-java-fullstack-development',
    title: 'The Secret Sauce of Rapid Java Fullstack Development',
    speakers: ['bharat-ranpariya'],
    event: 'april-meetup-2025',
    type: 'talk',
  },
  {
    slug: 'java-turns-30-erp-microservices',
    title: 'From Legacy to Legendary: Unleashing Business Agility Through ERP Microservices',
    speakers: ['niraj-salot'],
    event: 'java-turns-30',
    type: 'talk',
    startTime: '10:10',
    endTime: '11:10',
  },
  {
    slug: 'java-meetup-june-2025-openrewrite',
    title: 'Migration Engineering as Code with OpenRewrite',
    speakers: ['vikas-rajput'],
    event: 'java-meetup-june-2025',
    type: 'talk',
    startTime: '10:40',
    endTime: '11:40',
  },
  {
    slug: 'java-meetup-june-2025-ai-proof-engineer-panel',
    title: 'Panel Discussion: Becoming an AI-Proof Engineer',
    speakers: ['jigar-shah', 'nidhi-arora', 'bhagyesh-radiya'],
    event: 'java-meetup-june-2025',
    type: 'panel',
    startTime: '11:45',
    endTime: '13:00',
  },
  {
    slug: 'july-java-meetup-junior-dev-workshop',
    title: 'Junior Java Dev Special: Deploying Modern Java Apps: Spring Boot, React & AWS in Action',
    speakers: ['jeemy-patel', 'vaibhav-savaliya'],
    event: 'july-java-meetup-junior-dev-workshop',
    type: 'workshop',
    startTime: '09:30',
    endTime: '13:00',
  },
  {
    slug: 'building-rag-with-spring-ai',
    title: 'Building RAG with Spring AI',
    speakers: ['ketan-bhavsar'],
    event: 'building-rag-with-spring-ai',
    type: 'talk',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    slug: 'java-for-ai-build-your-own-mcp-server-with-spring-ai',
    title: 'Java for AI: Build Your Own MCP Server with Spring AI',
    speakers: ['milind-mehta'],
    event: 'java-for-ai-build-your-own-mcp-server-with-spring-ai',
    type: 'talk',
    startTime: '10:30',
    endTime: '12:30',
  },
  {
    slug: 'build-and-scale-modern-java-fullstack-app-on-gcp',
    title: 'Build & Scale Modern Java Fullstack App on GCP: From Code to Scalable Cloud Deployment',
    speakers: ['falgun-bhalsod'],
    event: 'build-and-scale-modern-java-fullstack-app-on-gcp',
    type: 'workshop',
    startTime: '10:00',
    endTime: '13:00',
  },
  {
    slug: 'java-25-virtual-threads',
    title: 'Java 25 Virtual Threads',
    speakers: ['tanvir-dhanani'],
    event: 'java-25-virtual-threads',
    type: 'talk',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    slug: 'java-25-unveiled-elevating-developer-experience',
    title: 'Java 25 Unveiled: Elevating Developer Experience',
    speakers: ['divyeshkumar-prajapati'],
    event: 'java-25-unveiled-elevating-developer-experience',
    type: 'talk',
    startTime: '10:30',
    endTime: '12:30',
  },
  {
    slug: 'powering-smart-ai-with-java',
    title: 'Powering Smart AI with Vector Databases & RAG with Java',
    speakers: ['bharat-ranpariya', 'aniket-datt'],
    event: 'powering-smart-ai-with-java',
    type: 'talk',
    startTime: '10:45',
    endTime: '12:00',
  },
  {
    slug: 'building-intelligent-agents-with-java',
    title: 'Building Intelligent Agents with Java',
    speakers: ['jigar-shah'],
    event: 'building-intelligent-agents-with-java',
    type: 'talk',
    startTime: '10:30',
    endTime: '12:30',
  },
  {
    slug: 'java-21-migration-playbook',
    title: 'The Java 21 Playbook: Expert Insights & Technical Deep-Dive',
    speakers: ['vikas-rajput', 'dhaval-gajjar'],
    event: 'java-21-migration-playbook',
    type: 'talk',
    startTime: '10:15',
    endTime: '11:30',
  },
  {
    slug: 'agentic-enterprise-ai-driven-product-engineering',
    title: 'Agentic Enterprise & AI-Driven Product Engineering',
    speakers: ['vinayak-joglekar'],
    event: 'agentic-enterprise-ai-driven-product-engineering',
    type: 'workshop',
    startTime: '10:45',
    endTime: '13:00',
  },
  {
    slug: 'java-september-meetup-2026-jugaad-vs-jfr',
    title: 'Jugaad vs. JFR: What Your Java Libraries Are Really Costing You',
    speakers: ['ashish-vaghela'],
    event: 'java-september-meetup-2026',
    type: 'talk',
  },
  {
    slug: 'java-september-meetup-2026-jobrunr',
    title: 'JobRunr - Easy Distributed Job Scheduling',
    speakers: ['ronald-dehuysser'],
    event: 'java-september-meetup-2026',
    type: 'talk',
  },
];
