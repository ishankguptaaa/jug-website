// React 18 doesn't know `fetchPriority` (warns) but passes the lowercase DOM
// attribute through; spread so the lint rule doesn't flag it.
const HERO_IMG_PRIORITY = { fetchpriority: 'high' };

// Same frame ratio as the Experts photos (285×296).
const FRAME = 'w-full h-auto aspect-[285/296]';

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

/**
 * Speaker photo in the Experts frame, or an initials avatar when there's no
 * photo. `priority` marks the above-the-fold profile photo (no lazy loading).
 */
export default function SpeakerPhoto({ speaker, priority = false, className = '' }) {
  if (!speaker.photo) {
    return (
      <div
        role="img"
        aria-label={speaker.name}
        className={`${FRAME} flex items-center justify-center rounded-[20px] border-2 border-black bg-[#EDD7FF] font-archivo text-[64px] sm:text-[40px] ${className}`}
      >
        <span aria-hidden="true">{initials(speaker.name)}</span>
      </div>
    );
  }
  return (
    <img
      src={speaker.photo}
      alt={speaker.name}
      width="285"
      height="296"
      decoding="async"
      {...(priority ? HERO_IMG_PRIORITY : { loading: 'lazy' })}
      className={`${FRAME} object-cover ${className}`}
    />
  );
}
