import { useParams } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import { getEventBySlug } from '../content';
import NotFoundPage from './NotFoundPage';

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = getEventBySlug(slug);
  if (!event) return <NotFoundPage />;
  return (
    <ComingSoon
      title={event.name}
      intro="The full event page with agenda, speakers and recordings is on its way."
      path={`/events/${event.slug}`}
    />
  );
}
