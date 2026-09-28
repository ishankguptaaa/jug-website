import { useParams } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import { getConferenceBySlug } from '../content';
import NotFoundPage from './NotFoundPage';

export default function ConferenceDetailPage() {
  const { slug } = useParams();
  const conference = getConferenceBySlug(slug);
  if (!conference) return <NotFoundPage />;
  return (
    <ComingSoon
      title={conference.name}
      intro={conference.tagline ?? 'The full conference page is on its way.'}
      path={`/conferences/${conference.slug}`}
    />
  );
}
