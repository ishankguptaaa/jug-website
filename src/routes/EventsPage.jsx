import { getPastEventsByYear, getUpcomingEvents, site } from '../content';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard, { EventCardCompact } from '../components/events/EventCard';
import ListSkeleton from '../components/events/ListSkeleton';
import { GRID } from '../components/events/eventsGrid';
import { useNow } from '../lib/useNow';

const DESCRIPTION = `Upcoming and past ${site.name} meetups in Gujarat — dates, venues, speakers, talks and registration links.`;

export default function EventsPage() {
  // null during prerender and the first client render (SSR-safe); lists are
  // time-dependent, so they render once the client knows the current time.
  const now = useNow();
  const upcoming = now ? getUpcomingEvents(now) : null;
  const pastByYear = now ? getPastEventsByYear(now) : null;

  return (
    <>
      <Seo title="Events" description={DESCRIPTION} path="/events" />

      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
            <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] md:text-[44px] md:leading-[52px]">
              Meetups &amp; Events
            </h1>
            <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              Hands-on sessions and talks by the {site.name} community. Join the next one, or catch
              up on the talks you missed.
            </p>
            <div className="mt-8 sm:mt-6 flex justify-center">
              <Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="upcoming-heading" className="bg-[#FFFCEF]">
        <Container>
          <div className="pt-[100px] pb-[50px] sm:pt-[50px] sm:pb-[25px]">
            <SectionHeading id="upcoming-heading" squiggle="Meetups" className="sm:text-center">
              Upcoming
            </SectionHeading>
            <div className="pt-[48px] sm:pt-[24px]">
              {upcoming === null ? (
                <ListSkeleton variant="full" />
              ) : upcoming.length ? (
                <ul className={GRID}>
                  {upcoming.map((event) => (
                    <li key={event.slug} className="h-full">
                      <EventCard event={event} now={now} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  headingAs="h3"
                  title="No upcoming meetups right now"
                  message="Follow us on Luma to hear about the next meetup as soon as it's announced."
                  action={<Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {pastByYear === null || pastByYear.length ? (
        <section aria-labelledby="past-heading" className="bg-[#FFFCEF]">
          <Container>
            <div className="pt-[50px] pb-[100px] sm:pt-[25px] sm:pb-[50px]">
              <SectionHeading id="past-heading" squiggle="Meetups" className="sm:text-center">
                Past
              </SectionHeading>
              {pastByYear === null ? (
                <div className="pt-[48px] sm:pt-[24px]">
                  <ListSkeleton variant="compact" />
                </div>
              ) : (
                pastByYear.map(({ year, events }) => (
                  <div key={year} className="pt-[48px] sm:pt-[24px]">
                    <h3 className="font-raleway font-bold text-[32px] leading-[40px] sm:text-[20px] sm:leading-[28px] sm:text-center">
                      {year}
                    </h3>
                    <ul className={`mt-6 sm:mt-4 ${GRID}`}>
                      {events.map((event) => (
                        <li key={event.slug} className="h-full">
                          <EventCardCompact event={event} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </Container>
        </section>
      ) : (
        <div className="bg-[#FFFCEF] pb-[50px] sm:pb-[25px]" />
      )}
    </>
  );
}
