import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Font Awesome is only used on this page (check icons in the hero).
import '@fortawesome/fontawesome-free/css/all.min.css';
import Seo from '../components/Seo';
import { CDJ_2025_SLUG, getConferenceBySlug } from '../content';
import { usePageChrome } from '../layouts/pageChrome';
import Event from '../event/Event';
import EventSubNav from '../event/EventSubNav';
import AboutEvent from '../event/AboutEvent';
import Speaker from '../event/Speaker';
import Schedule from '../event/Schedule';
import EventVenue from '../event/EventVenue';
import Goodies from '../event/Goodies';
import SubmitCFP from '../pages/SubmitCFP';
import Sponsors from '../event/Sponsors';
import SponsorsshipOpp from '../event/SponsorsshipOpp';
import JugPartners from '../event/JugPartners';
import CommunityPartners from '../event/CommunityPartners';
import EventVolunteer from '../event/EventVolunteer';
import BooKSlots from '../event/BooKSlots';

/**
 * Community Day for Java 2025 — the original event page, unchanged.
 * Served at /<CDJ_2025_SLUG> (legacy URL) and /conferences/<CDJ_2025_SLUG>.
 */
export default function CommunityDay2025Page() {
  const conference = getConferenceBySlug(CDJ_2025_SLUG);
  // Lilac header to match this page's hero; keep "Conferences" active on the legacy URL too.
  // Header CTA is "Book Your Slots" on this page (user decision), not "Join Community".
  usePageChrome({
    headerTone: 'bg-[#F6EAFF]',
    activeNav: '/conferences',
    headerCta: { label: 'Book Your Slots', href: conference?.registrationUrl },
  });

  const subNavItems = [
    { label: 'About', hash: 'about-event' },
    { label: 'Speakers', hash: 'speakers-event' },
    conference?.cfp?.url ? { label: 'Submit a CFP', href: conference.cfp.url } : null,
    { label: 'Schedule', hash: 'schedule-event' },
    { label: 'Sponsors', hash: 'sponsors-event' },
    { label: 'Our RockStars', hash: 'team-event' },
  ].filter(Boolean);

  return (
    <>
      <Seo
        title={conference?.name}
        description={conference?.description?.[0]}
        path={`/conferences/${CDJ_2025_SLUG}`}
        image={conference?.banner}
      />
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar closeOnClick />
      <EventSubNav label={`${conference?.name ?? 'Conference'} sections`} items={subNavItems} />
      <Event />
      <div id="about-event">
        <AboutEvent />
      </div>
      <div id="speakers-event">
        <Speaker />
      </div>
      <div id="schedule-event">
        <Schedule />
      </div>
      <EventVenue />
      <Goodies />
      <SubmitCFP />
      <div id="sponsors-event">
        <Sponsors />
      </div>
      <SponsorsshipOpp />
      <JugPartners />
      <CommunityPartners />
      <div id="team-event">
        <EventVolunteer />
      </div>
      <BooKSlots />
    </>
  );
}
