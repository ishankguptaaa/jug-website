import { useParams } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import { getGalleryBySlug } from '../content';
import NotFoundPage from './NotFoundPage';

export default function GalleryDetailPage() {
  const { slug } = useParams();
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return <NotFoundPage />;
  return (
    <ComingSoon
      title={gallery.title}
      intro="This photo album is on its way."
      path={`/gallery/${gallery.slug}`}
    />
  );
}
