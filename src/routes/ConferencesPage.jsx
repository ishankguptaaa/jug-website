import { getConferencesByStatus, site } from '../content';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import SectionHeading from '../components/ui/SectionHeading';
import ConferenceCard from '../components/conferences/ConferenceCard';
import ListSkeleton from '../components/events/ListSkeleton';
import { GRID } from '../components/events/eventsGrid';
import { useNow } from '../lib/useNow';

const DESCRIPTION = `Conferences by the ${site.name} community — dates, venues, speakers, sessions and registration links.`;

function ConferenceSection({ id, title, squiggle, status, conferences, featured = false }) {
  if (!conferences.length) return null;
  return (
    <section aria-labelledby={id} className="py-[50px] sm:py-[25px]">
      <SectionHeading id={id} squiggle={squiggle} className="sm:text-center">
        {title}
      </SectionHeading>
      <ul className={`pt-[48px] sm:pt-[24px] ${featured ? 'space-y-8 sm:space-y-6' : GRID}`}>
        {conferences.map((c) => (
          <li key={c.slug} className="h-full">
            <ConferenceCard conference={c} status={status} featured={featured} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ConferencesPage() {
  // null during prerender and the first client render (SSR-safe); the lists
  // are time-dependent, so they render once the client knows the current time.
  const now = useNow();
  const byStatus = now ? getConferencesByStatus(now) : null;

  return (
    <>
      <Seo title="Conferences" description={DESCRIPTION} path="/conferences" />

      <PageHero
        title="Conferences"
        intro={`Flagship community conferences by ${site.name}. See what's next, or look back at past editions.`}
      >
        <Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>
      </PageHero>

      <div className="bg-[#FFFCEF]">
        <Container className="py-[50px] sm:py-[25px]">
          {byStatus === null ? (
            <div className="py-[50px] sm:py-[25px]">
              <ListSkeleton variant="full" />
            </div>
          ) : (
            <>
              <ConferenceSection
                id="live-heading"
                title="Currently"
                squiggle="hosting"
                status="live"
                conferences={byStatus.live}
                featured
              />
              {byStatus.live.length || byStatus.upcoming.length ? null : (
                <div className="py-[50px] sm:py-[25px]">
                  <EmptyState
                    title="No upcoming conferences right now"
                    message="Follow us on Luma to hear about the next one as soon as it's announced."
                    action={<Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>}
                  />
                </div>
              )}
              <ConferenceSection
                id="upcoming-heading"
                title="Upcoming"
                squiggle="Conferences"
                status="upcoming"
                conferences={byStatus.upcoming}
              />
              <ConferenceSection
                id="completed-heading"
                title="Completed"
                squiggle="Conferences"
                status="completed"
                conferences={byStatus.completed}
              />
            </>
          )}
        </Container>
      </div>
    </>
  );
}
