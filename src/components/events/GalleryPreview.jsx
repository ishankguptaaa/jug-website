import Button from '../ui/Button';

/**
 * Up to `limit` photo thumbnails from a gallery + "View full gallery" link
 * to /gallery/:slug. Renders nothing when the gallery has no photos.
 *
 * @param {object}  gallery     gallery record (galleries.js)
 * @param {number}  [limit]     max thumbnails (default 6)
 * @param {boolean} [showTitle] show the gallery title above the grid (e.g. when listing several)
 * @param {string}  [headingAs] tag for the title (default 'h3')
 * @param {string}  [className]
 */
export default function GalleryPreview({
  gallery,
  limit = 6,
  showTitle = false,
  headingAs: Heading = 'h3',
  className = '',
}) {
  const photos = (gallery?.photos ?? []).slice(0, limit);
  if (photos.length === 0) return null;

  return (
    <div className={className}>
      {showTitle && gallery.title ? (
        <Heading className="pb-6 sm:pb-4 font-raleway font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px]">
          {gallery.title}
        </Heading>
      ) : null}
      <ul className="grid grid-cols-3 sm:grid-cols-2 gap-6 sm:gap-3 md:gap-4">
        {photos.map((photo) => (
          <li key={photo.src}>
            <img
              src={photo.thumb ?? photo.src}
              alt={photo.alt ?? ''}
              width={photo.w}
              height={photo.h}
              loading="lazy"
              decoding="async"
              className="w-full h-auto aspect-[4/3] object-cover rounded-[24px] sm:rounded-2xl border border-black bg-[#FAFAFA]"
            />
          </li>
        ))}
      </ul>
      <div className="pt-8 sm:pt-5 flex justify-center">
        <Button
          to={`/gallery/${gallery.slug}`}
          shape="card"
          aria-label={gallery.title ? `View full gallery: ${gallery.title}` : undefined}
        >
          View full gallery
        </Button>
      </div>
    </div>
  );
}
