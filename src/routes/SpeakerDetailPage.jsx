import { useParams } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import { getSpeakerBySlug } from '../content';
import NotFoundPage from './NotFoundPage';

export default function SpeakerDetailPage() {
  const { slug } = useParams();
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return <NotFoundPage />;
  return (
    <ComingSoon
      title={speaker.name}
      intro="This speaker’s profile with all their talks is on its way."
      path={`/speakers/${speaker.slug}`}
    />
  );
}
