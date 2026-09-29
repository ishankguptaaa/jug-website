import { formatDate, getAllConferences, getAllEvents, getOpenCfpUrl, getSpeakerDirectory, site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Team from '../event/Team';
import Volunteer from '../pages/Volunteer';
import { useNow } from '../lib/useNow';

const DESCRIPTION = `About ${site.name}: our story, mission, the people behind the community and how to get involved.`;

const SECTION = 'pt-[100px] sm:pt-[50px]';
const GRID = 'pt-[48px] sm:pt-[24px] grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 gap-8 sm:gap-6';
const CARD_TITLE = 'font-raleway font-bold text-[24px] leading-[32px] sm:text-[20px] sm:leading-[28px]';
const CARD_TEXT = 'mt-3 font-raleway text-[18px] leading-[28px] sm:text-[14px] sm:leading-[24px]';

const WHAT_WE_DO = [
  {
    title: 'Meetups',
    bg: 'bg-[#FFEFC6]',
    text: 'Regular sessions where developers share what they are building and learning.',
    to: '/events',
    cta: 'See events',
  },
  {
    title: 'Workshops',
    bg: 'bg-[#CAF8FC]',
    text: 'Hands-on sessions where you write code alongside people who use the tools every day.',
    to: '/events',
    cta: 'Find a workshop',
  },
  {
    title: 'Conferences',
    bg: 'bg-[#FFC0E7]',
    text: 'Full-day community conferences with talks, workshops and time to meet other developers.',
    to: '/conferences',
    cta: 'See conferences',
  },
];

export default function AboutPage() {
  const now = useNow();
  const events = getAllEvents();
  const stats = [
    events.length ? { label: 'First meetup', value: formatDate(events.at(-1).date) } : null,
    { label: 'Events', value: events.length },
    { label: 'Speakers', value: getSpeakerDirectory().length },
    { label: 'Conferences', value: getAllConferences().length },
  ].filter(Boolean);

  const participate = [
    {
      title: 'Attend',
      text: 'Come along to a meetup or conference. Follow our Luma calendar so you never miss one.',
      actions: [
        { to: '/events', label: 'Browse events' },
        { href: site.lumaCalendarUrl, label: 'Follow on Luma' },
      ],
    },
    {
      title: 'Speak',
      text: 'Have something to share? First-time speakers are welcome.',
      actions: [{ href: getOpenCfpUrl(now) ?? site.joinUrl, label: 'Submit a talk' }],
    },
    {
      title: 'Volunteer',
      text: 'Help run our events, welcome newcomers or spread the word.',
      actions: [{ href: site.volunteerFormUrl, label: 'Become a volunteer' }],
    },
    {
      title: 'Host a meetup',
      text: 'Have a venue and want to bring the community to your campus or office?',
      actions: [{ to: '/partners', label: 'Venue partners' }],
    },
    {
      title: 'Join the community',
      text: 'Chat with fellow Java developers and hear about events first.',
      actions: [
        { href: site.socials.whatsapp, label: 'WhatsApp' },
        { href: site.socials.linkedin, label: 'LinkedIn' },
      ],
    },
  ];

  return (
    <>
      <Seo title="About" description={DESCRIPTION} path="/about" />

      <PageHero
        title={`About ${site.name}`}
        intro="Our story, the people behind the community, and how to get involved."
      />

      <div className="bg-[#FFFCEF]">
        <Container className="pb-[100px] sm:pb-[50px]">
          <section
            aria-labelledby="who-heading"
            className={`${SECTION} grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-10 sm:gap-6`}
          >
            <div>
              <SectionHeading id="who-heading">Who We Are</SectionHeading>
              <p className="mt-6 font-raleway text-[20px] leading-[32px] sm:text-[16px] sm:leading-[26px]">
                {site.about}
              </p>
            </div>
            <Card bg="bg-[#EDD7FF]" className="p-10 sm:p-6">
              <h2 className={CARD_TITLE}>Our Mission</h2>
              <p className={CARD_TEXT}>{site.mission}</p>
            </Card>
          </section>

          <section aria-labelledby="history-heading" className={SECTION}>
            <SectionHeading id="history-heading" squiggle="Story" className="sm:text-center">
              Our
            </SectionHeading>
            <dl className="pt-[48px] sm:pt-[24px] grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 gap-6 sm:gap-3">
              {stats.map((stat) => (
                <Card key={stat.label} bg="bg-[#D7FFF1]" className="p-6 sm:p-4 text-center">
                  <dt className="font-raleway text-[16px] leading-[24px] sm:text-[14px]">{stat.label}</dt>
                  <dd className="font-raleway font-bold text-[32px] leading-[40px] sm:text-[22px] sm:leading-[30px]">
                    {stat.value}
                  </dd>
                </Card>
              ))}
            </dl>
            {site.milestones?.length ? (
              <ol className="mt-10 sm:mt-6 ml-3 border-l-2 border-black space-y-8 sm:space-y-6">
                {site.milestones.map((m) => (
                  <li key={m.title} className="relative pl-8 sm:pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-[#FFC62E]"
                    />
                    <h3 className={CARD_TITLE}>
                      {m.year ? `${m.year}: ` : null}
                      {m.title}
                    </h3>
                    {m.body ? <p className={CARD_TEXT}>{m.body}</p> : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </section>

          <section aria-labelledby="what-heading" className={SECTION}>
            <SectionHeading id="what-heading" squiggle="Do" className="sm:text-center">
              What We
            </SectionHeading>
            <ul className={GRID}>
              {WHAT_WE_DO.map((item) => (
                <li key={item.title}>
                  <Card bg={item.bg} className="h-full p-8 sm:p-6 flex flex-col items-start">
                    <h3 className={CARD_TITLE}>{item.title}</h3>
                    <p className={`${CARD_TEXT} flex-1`}>{item.text}</p>
                    <Button to={item.to} shape="card" className="mt-6">
                      {item.cta}
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="community-heading" className={SECTION}>
            <Card bg="bg-[#FFE8AC]" className="px-[50px] py-[50px] sm:px-6 sm:py-8 text-center">
              <h2
                id="community-heading"
                className="font-raleway font-bold text-[40px] leading-[48px] sm:text-[24px] sm:leading-[32px]"
              >
                Community-driven and non-commercial
              </h2>
              <p className="mt-4 mx-auto max-w-[760px] font-raleway font-medium text-[20px] leading-[30px] sm:text-[16px] sm:leading-[24px]">
                {site.name} is run by volunteers. We do not sell anything and we do not run for profit. Sponsors and
                venue partners help us cover costs, and they never decide what we teach.
              </p>
            </Card>
          </section>
        </Container>
      </div>

      <Team />
      <Volunteer />

      <div className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          <section aria-labelledby="participate-heading">
            <SectionHeading id="participate-heading" squiggle="Involved" className="sm:text-center">
              Get
            </SectionHeading>
            <ul className={GRID}>
              {participate.map((item) => (
                <li key={item.title}>
                  <Card className="h-full p-8 sm:p-6 flex flex-col items-start">
                    <h3 className={CARD_TITLE}>{item.title}</h3>
                    <p className={`${CARD_TEXT} flex-1`}>{item.text}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.actions.map(({ label, ...link }) => (
                        <Button key={label} shape="card" {...link}>
                          {label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </>
  );
}
