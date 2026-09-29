import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import StatusBadge from '../components/ui/StatusBadge';
import Pill from '../components/ui/Pill';
import SpeakerChip from '../components/events/SpeakerChip';
import SessionItem from '../components/events/SessionItem';
import GalleryPreview from '../components/events/GalleryPreview';
import VenueCard from '../components/events/VenueCard';
import {
  formatDate,
  formatTimeRange,
  getConferenceBySlug,
  getEventBySlug,
  getEventPlace,
  getEventPlaceLabel,
  getGalleriesForEvent,
  getSessionsForEvent,
  getSpeakersForEvent,
  getStatus,
  getVenueForEvent,
  istToDate,
  site,
} from '../content';
import { useNow } from '../lib/useNow';
import { absoluteUrl } from '../lib/url';
import NotFoundPage from './NotFoundPage';

// React 18 doesn't know `fetchPriority` (warns) but passes the lowercase DOM
// attribute through; spread so the lint rule doesn't flag it.
const HERO_IMG_PRIORITY = { fetchpriority: 'high' };

/** True for lu.ma / luma.com (incl. subdomains) event links. */
function isLuma(url) {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === 'lu.ma' || host === 'luma.com' || host.endsWith('.luma.com');
  } catch {
    return false;
  }
}

/** One content block on the warm background, with an h2. */
function DetailSection({ title, squiggle, children }) {
  return (
    <section className="pt-[100px] sm:pt-[50px] md:pt-[72px]">
      <SectionHeading className="md:text-[44px] md:leading-[52px]" squiggle={squiggle}>
        {title}
      </SectionHeading>
      <div className="pt-[48px] sm:pt-[20px]">{children}</div>
    </section>
  );
}

function eventJsonLd(event, place, path) {
  const iso = (time) => (time ? (istToDate(event.date, time)?.toISOString() ?? event.date) : event.date);
  const url = absoluteUrl(path);
  const address = [place?.address, place?.city].filter(Boolean).join(', ') || undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: iso(event.startTime),
    endDate: iso(event.endTime),
    eventAttendanceMode: place?.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: place?.online
      ? { '@type': 'VirtualLocation', url: event.externalUrl ?? url }
      : place?.name || address
        ? { '@type': 'Place', name: place?.name, address }
        : undefined,
    image: event.banner ? [absoluteUrl(event.banner)] : undefined,
    url,
    organizer: { '@type': 'Organization', name: site.fullName ?? site.name, url: site.url },
  };
}

export default function EventDetailPage() {
  const { slug } = useParams();
  // Hooks before the early return; `now` is null until mounted (SSR-safe).
  const now = useNow();
  const event = getEventBySlug(slug);
  if (!event) return <NotFoundPage />;

  const path = `/events/${event.slug}`;
  // Before mount (SSR-safe: `now` is null), getStatus falls back to a manual
  // override, so the Register CTA only appears once the real status is known.
  const status = getStatus(event, now);
  const canRegister = (status === 'upcoming' || status === 'live') && Boolean(event.registrationUrl);
  const place = getEventPlace(event);
  const venue = getVenueForEvent(event.slug);
  const speakers = getSpeakersForEvent(event.slug);
  const sessions = getSessionsForEvent(event.slug);
  const galleries = getGalleriesForEvent(event.slug).filter((g) => g.photos?.length > 0);
  const conference = event.conference ? getConferenceBySlug(event.conference) : undefined;
  const time = formatTimeRange(event.startTime, event.endTime);
  const where = getEventPlaceLabel(event);
  const hasCtas = canRegister || Boolean(event.externalUrl);
  // Same test VenueCard uses to decide whether it renders anything.
  const hasVenue = Boolean(venue?.name || place?.name || place?.online);

  return (
    <>
      <Seo
        title={event.name}
        description={event.description}
        path={path}
        image={event.banner}
        noindex={event.isSample}
        jsonLd={event.isSample ? undefined : eventJsonLd(event, place, path)}
      />

      {/* Hero */}
      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="grid grid-cols-12 gap-10 md:gap-8 sm:gap-6 items-center pt-12 pb-[80px] sm:pt-6 sm:pb-[40px]">
            <div
              className={`${event.banner ? 'col-span-6' : 'col-span-12 max-w-[900px]'} md:col-span-12 sm:col-span-12 min-w-0`}
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-2">
                <Pill tone="bg-[#FFFCEF] border-[#E8C52A]">Meetup</Pill>
                {place?.online ? <Pill tone="bg-[#CAF8FC] border-black">Online</Pill> : null}
                <StatusBadge status={status} />
              </div>
              <h1 className="mt-5 font-raleway font-semibold text-[46px] leading-[58px] md:text-[38px] md:leading-[48px] sm:text-[24px] sm:leading-[32px] break-words">
                {event.name}
              </h1>
              <dl className="mt-6 sm:mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 sm:gap-x-4 font-raleway text-[18px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
                {event.date ? (
                  <>
                    <dt className="font-semibold">Date</dt>
                    <dd>
                      <time dateTime={event.date}>{formatDate(event.date)}</time>
                    </dd>
                  </>
                ) : null}
                {time ? (
                  <>
                    <dt className="font-semibold">Time</dt>
                    <dd>{time}</dd>
                  </>
                ) : null}
                {where ? (
                  <>
                    <dt className="font-semibold">Where</dt>
                    <dd className="min-w-0 break-words">{where}</dd>
                  </>
                ) : null}
              </dl>
              {hasCtas ? (
                <div className="mt-8 sm:mt-6 flex flex-wrap gap-4 sm:gap-3">
                  {canRegister ? (
                    <Button href={event.registrationUrl} shape="card">
                      Register now
                    </Button>
                  ) : null}
                  {event.externalUrl ? (
                    <Button href={event.externalUrl} shape="card">
                      {isLuma(event.externalUrl) ? 'View on Luma' : 'Event page'}
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            {event.banner ? (
              <div className="col-span-6 md:col-span-12 sm:col-span-12">
                <img
                  src={event.banner}
                  alt={`Banner for ${event.name}`}
                  width="1440"
                  height="734"
                  {...HERO_IMG_PRIORITY}
                  decoding="async"
                  className="w-full h-auto aspect-[1440/734] object-cover rounded-[40px] sm:rounded-[24px] border border-black bg-white"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <div className="bg-[#FFFCEF]">
        <Container size="xl" className="sm:max-w-[345px] pb-[100px] sm:pb-[50px]">
          {event.description ? (
            <DetailSection title="About this" squiggle="meetup">
              <p className="max-w-[900px] font-raleway text-[20px] leading-[32px] sm:text-[15px] sm:leading-[24px]">
                {event.description}
              </p>
            </DetailSection>
          ) : null}

          {speakers.length > 0 ? (
            <DetailSection title="Meet the" squiggle="Speakers">
              <ul className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 sm:gap-4">
                {speakers.map((speaker) => (
                  <SpeakerChip key={speaker.slug} as="li" speaker={speaker} className="h-full" />
                ))}
              </ul>
            </DetailSection>
          ) : null}

          {sessions.length > 0 ? (
            <DetailSection title="Talks &" squiggle="Sessions">
              <ul className="flex flex-col gap-6 sm:gap-4">
                {sessions.map((session) => (
                  <SessionItem key={session.slug} as="li" id={session.slug} session={session} />
                ))}
              </ul>
            </DetailSection>
          ) : null}

          {galleries.length > 0 ? (
            <DetailSection title="Moments from the" squiggle="Meetup">
              <div className="flex flex-col gap-[64px] sm:gap-10">
                {galleries.map((gallery) => (
                  <GalleryPreview
                    key={gallery.slug}
                    gallery={gallery}
                    showTitle={galleries.length > 1}
                  />
                ))}
              </div>
            </DetailSection>
          ) : null}

          {hasVenue ? (
            <DetailSection title={venue ? 'Venue' : 'Where'} squiggle={venue ? 'Partner' : undefined}>
              <VenueCard
                place={place}
                venue={venue}
                onlineUrl={event.externalUrl}
                bg="bg-[#EDD7FF]"
              />
            </DetailSection>
          ) : null}

          {conference ? (
            <section aria-labelledby="conference-heading" className="pt-[100px] sm:pt-[50px] md:pt-[72px]">
              <Card
                bg="bg-[#FFE8AC]"
                className="flex items-center justify-between gap-8 sm:flex-col sm:items-start sm:gap-4 p-[50px] sm:p-[25px] md:p-[40px]"
              >
                <div className="min-w-0 font-raleway">
                  <p className="font-medium text-[16px] sm:text-[13px]">This meetup is part of</p>
                  <h2
                    id="conference-heading"
                    className="pt-2 font-bold text-[40px] leading-[48px] sm:text-[22px] sm:leading-[28px] break-words"
                  >
                    {conference.name}
                  </h2>
                </div>
                <Button
                  to={`/conferences/${conference.slug}`}
                  className="shrink-0"
                  aria-label={`View conference: ${conference.name}`}
                >
                  View conference
                </Button>
              </Card>
            </section>
          ) : null}
        </Container>
      </div>
    </>
  );
}
