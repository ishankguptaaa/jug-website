import { Link } from 'react-router-dom';
import { formatDateRange, getSponsorsByKind, getVenueHistory, site, venues } from '../content';
import Seo from '../components/Seo';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ExternalLink from '../components/ui/ExternalLink';
import { focusRing } from '../components/ui/focusRing';
import VenueCard from '../components/events/VenueCard';
import PartnerLogos from '../components/partners/PartnerLogos';

const DESCRIPTION = `The venue partners, sponsors and communities that make ${site.name} meetups and conferences happen.`;

const GROUP_HEADING = 'font-raleway font-bold text-[16px] leading-[22px] tracking-[0.5em] uppercase';

const HOSTED = [
  { type: 'event', title: 'Events hosted', base: '/events' },
  { type: 'conference', title: 'Conferences hosted', base: '/conferences' },
];

function VenueHistory({ venueSlug }) {
  const history = getVenueHistory(venueSlug);
  const lists = HOSTED.map((list) => ({
    ...list,
    items: history.filter((h) => h.type === list.type).map((h) => h.item),
  })).filter((list) => list.items.length);
  if (!lists.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 pt-6">
      {lists.map(({ type, title, base, items }) => (
        <div key={type}>
          <h4 className="font-bold text-[20px] leading-[28px] sm:text-[16px] sm:leading-[24px]">{title}</h4>
          <ul className="mt-2 space-y-2 text-[16px] leading-[24px] sm:text-[14px] sm:leading-[22px]">
            {items.map((item) => {
              const start = item.date ?? item.startDate;
              return (
                <li key={item.slug}>
                  <Link
                    to={`${base}/${item.slug}`}
                    className={`font-semibold underline underline-offset-4 hover:text-gray-600 ${focusRing}`}
                  >
                    {item.name}
                  </Link>
                  <time dateTime={start} className="block">{formatDateRange(start, item.endDate)}</time>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function LogoGroup({ title, partners }) {
  if (!partners.length) return null;
  return (
    <div className="pt-[48px] sm:pt-[24px]">
      <h3 className={GROUP_HEADING}>{title}</h3>
      <PartnerLogos partners={partners} className="pt-6 sm:pt-4" />
    </div>
  );
}

/** Individual supporters: their photo is a headshot, so show name and role too. */
function SupporterGroup({ supporters }) {
  if (!supporters.length) return null;
  return (
    <div className="pt-[48px] sm:pt-[24px]">
      <h3 className={GROUP_HEADING}>Community Supporters</h3>
      <ul className="pt-6 sm:pt-4 flex flex-wrap justify-center gap-6 sm:gap-3 font-raleway">
        {supporters.map((s) => (
          <li key={s.slug} className="w-[285px] sm:w-[148px]">
            <ExternalLink href={s.website} className="group block rounded-3xl">
              <img
                src={s.logo}
                alt=""
                width="285"
                height="296"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto aspect-[285/296] object-cover rounded-3xl"
              />
              <span className="block pt-3 font-bold text-[20px] leading-[28px] sm:text-[14px] sm:leading-[20px] group-hover:underline underline-offset-4">
                {s.name}
              </span>
            </ExternalLink>
            <p className="text-[16px] leading-[24px] sm:text-[12px] sm:leading-[18px]">
              {[s.designation, s.company ?? s.location].filter(Boolean).join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <>
      <Seo title="Partners" description={DESCRIPTION} path="/partners" />

      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
            <SectionHeading as="h1" className="md:text-[44px] md:leading-[52px]">
              Our Partners
            </SectionHeading>
            <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              {site.name} runs on the generosity of the campuses and companies that open their doors
              to us, our sponsors, and the communities we build with.
            </p>
          </div>
        </Container>
      </section>

      <div className="bg-[#FFFCEF]">
        <Container className="pb-[100px] sm:pb-[50px] text-center">
          <section aria-labelledby="venues-heading" className="pt-[100px] sm:pt-[50px]">
            <SectionHeading id="venues-heading" squiggle="Partners">
              Venue
            </SectionHeading>
            <ul className="pt-[48px] sm:pt-[24px] space-y-8 sm:space-y-6 text-left">
              {venues.map((venue) => (
                <li key={venue.slug}>
                  <VenueCard venue={venue} bg="bg-[#EDD7FF]">
                    <VenueHistory venueSlug={venue.slug} />
                  </VenueCard>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sponsors-heading" className="pt-[100px] sm:pt-[50px]">
            <SectionHeading id="sponsors-heading">Sponsors</SectionHeading>
            <LogoGroup title="Companies" partners={getSponsorsByKind('sponsor')} />
            <SupporterGroup supporters={getSponsorsByKind('supporter')} />
          </section>

          <section aria-labelledby="community-heading" className="pt-[100px] sm:pt-[50px]">
            <SectionHeading id="community-heading" squiggle="Partners">
              Community
            </SectionHeading>
            <LogoGroup title="Java User Groups" partners={getSponsorsByKind('jug')} />
            <LogoGroup title="Communities" partners={getSponsorsByKind('community')} />
          </section>
        </Container>
      </div>
    </>
  );
}
