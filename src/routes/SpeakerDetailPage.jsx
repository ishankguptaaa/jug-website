import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import DetailSection from '../components/ui/DetailSection';
import { ConferenceCardCompact } from '../components/conferences/ConferenceCard';
import { EventCardCompact } from '../components/events/EventCard';
import SessionItem from '../components/events/SessionItem';
import { GRID } from '../components/events/eventsGrid';
import SpeakerPhoto from '../components/speakers/SpeakerPhoto';
import SpeakerRole from '../components/speakers/SpeakerRole';
import SpeakerSocials from '../components/speakers/SpeakerSocials';
import {
  getSessionsForSpeaker,
  getSpeakerBySlug,
  site,
} from '../content';
import NotFoundPage from './NotFoundPage';

const sessionPath = ({ slug, parent }) =>
  `/${parent.type === 'event' ? 'events' : 'conferences'}/${parent.item.slug}#${slug}`;

export default function SpeakerDetailPage() {
  const { slug } = useParams();
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return <NotFoundPage />;

  const talks = getSessionsForSpeaker(speaker.slug);
  const parents = (type) => [
    ...new Set(talks.filter((t) => t.parent.type === type).map((t) => t.parent.item)),
  ];
  const events = parents('event').sort((a, b) => b.date.localeCompare(a.date));
  const conferences = parents('conference').sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <>
      <Seo
        title={speaker.name}
        description={speaker.bio || `Talks and sessions by ${speaker.name} at ${site.name}.`}
        path={`/speakers/${speaker.slug}`}
        image={speaker.photo}
        noindex={speaker.isSample}
      />

      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="grid grid-cols-12 gap-10 md:gap-8 sm:gap-6 items-center pt-12 pb-[80px] sm:pt-6 sm:pb-[40px]">
            <div className="col-span-3 md:col-span-4 sm:col-span-12 sm:w-[200px] sm:mx-auto">
              <SpeakerPhoto speaker={speaker} priority />
            </div>
            <div className="col-span-9 md:col-span-8 sm:col-span-12 min-w-0 sm:text-center">
              <h1 className="font-raleway font-semibold text-[46px] leading-[58px] md:text-[38px] md:leading-[48px] sm:text-[24px] sm:leading-[32px] break-words">
                {speaker.name}
              </h1>
              <SpeakerRole
                speaker={speaker}
                className="pt-3 text-[20px] leading-[28px] sm:text-[14px] sm:leading-[22px]"
              />
              {speaker.bio ? (
                <p className="mt-6 sm:mt-4 max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
                  {speaker.bio}
                </p>
              ) : null}
              <SpeakerSocials speaker={speaker} className="pt-6 sm:pt-4 sm:justify-center" />
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-[#FFFCEF]">
        <Container size="xl" className="sm:max-w-[345px] pb-[100px] sm:pb-[50px]">
          {talks.length ? (
            <>
              <DetailSection title="Talks &" squiggle="Sessions">
                <ul className="flex flex-col gap-6 sm:gap-4">
                  {talks.map((talk) => (
                    <SessionItem
                      key={talk.slug}
                      as="li"
                      session={talk}
                      showDate
                      speakers={talk.speakers.length > 1 ? talk.speakers.map(getSpeakerBySlug).filter(Boolean) : []}
                      titleTo={sessionPath(talk)}
                    />
                  ))}
                </ul>
              </DetailSection>

              {events.length ? (
                <DetailSection title="Events" squiggle="participated">
                  <ul className={GRID}>
                    {events.map((event) => (
                      <li key={event.slug}>
                        <EventCardCompact event={event} headingAs="h3" />
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}

              {conferences.length ? (
                <DetailSection title="Conferences" squiggle="participated">
                  <ul className={GRID}>
                    {conferences.map((conference) => (
                      <li key={conference.slug}>
                        <ConferenceCardCompact conference={conference} headingAs="h3" />
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}
            </>
          ) : (
            <div className="pt-[100px] sm:pt-[50px]">
              <EmptyState
                title="No talks listed yet"
                message={`${speaker.name}'s sessions at ${site.name} will show up here.`}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
