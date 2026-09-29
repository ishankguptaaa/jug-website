import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { focusRing } from '../ui/focusRing';

const SWIPE_PX = 50;

// White ring: the black `focusRing` would be invisible on the dark overlay.
const CONTROL =
  'inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-black bg-white text-black text-[20px] hover:bg-[#FFC62E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/**
 * Thumbnail grid + lightbox (native <dialog>: Esc, focus trap and focus
 * return come from the browser). The full-size image is only rendered while
 * the lightbox is open. ←/→ and swipe move between photos.
 */
export default function AlbumPhotos({ photos }) {
  const dialogRef = useRef(null);
  const touchX = useRef(0);
  const [index, setIndex] = useState(null);
  const photo = index === null ? null : photos[index];

  const open = (i) => {
    setIndex(i);
    dialogRef.current.showModal();
  };
  const close = () => dialogRef.current.close();
  const step = (delta) => setIndex((i) => (i + delta + photos.length) % photos.length);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <ul className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-6 md:gap-4 sm:gap-3">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className={`block w-full overflow-hidden rounded-[24px] sm:rounded-2xl border border-black bg-[#FAFAFA] ${focusRing}`}
            >
              <img
                src={p.thumb ?? p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto aspect-[4/3] object-cover transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Clicks on the dialog itself (not its children) are on the dark
          backdrop area, so they close it. */}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 w-full h-full max-w-none max-h-none p-6 sm:p-3 bg-black/90 text-white open:flex flex-col items-center gap-4 sm:gap-3"
      >
        <div className="w-full flex items-center justify-between gap-4">
          <p aria-live="polite" className="font-medium text-[16px] sm:text-[14px]">
            {photo ? `${index + 1} / ${photos.length}` : null}
          </p>
          <button type="button" onClick={close} aria-label="Close photo viewer" className={CONTROL}>
            <FaXmark aria-hidden="true" />
          </button>
        </div>
        {photo ? (
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            decoding="async"
            className="flex-1 min-h-0 w-full object-contain"
          />
        ) : null}
        {photos.length > 1 ? (
          <div className="flex gap-4">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={CONTROL}>
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className={CONTROL}>
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
