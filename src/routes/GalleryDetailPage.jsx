import { useParams } from 'react-router-dom';
import { formatDate, getConferenceBySlug, getEventBySlug, getGalleryBySlug, site } from '../content';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import AlbumPhotos from '../components/gallery/AlbumPhotos';
import NotFoundPage from './NotFoundPage';

export default function GalleryDetailPage() {
  const { slug } = useParams();
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return <NotFoundPage />;

  // Content validation guarantees exactly one existing parent.
  const parent = gallery.event ? getEventBySlug(gallery.event) : getConferenceBySlug(gallery.conference);
  const parentPath = gallery.event ? `/events/${parent.slug}` : `/conferences/${parent.slug}`;

  return (
    <>
      <Seo
        title={gallery.title}
        description={`Photos from ${parent.name} by the ${site.name} community.`}
        path={`/gallery/${gallery.slug}`}
        image={gallery.cover}
      />

      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
            <SectionHeading as="h1" className="md:text-[44px] md:leading-[52px] break-words">
              {gallery.title}
            </SectionHeading>
            <p className="mt-6 font-raleway font-medium text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              <time dateTime={gallery.date}>{formatDate(gallery.date)}</time>
            </p>
            <div className="mt-8 sm:mt-6 flex justify-center">
              <Button to={parentPath} shape="card">
                Back to {parent.name}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          <AlbumPhotos photos={gallery.photos} />
        </Container>
      </div>
    </>
  );
}
