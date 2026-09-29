import { initialsOf } from '../../content';
import { HERO_IMG_PRIORITY } from '../ui/heroImg';

// Same frame ratio as the Experts photos (285×296).
const FRAME = 'w-full h-auto aspect-[285/296]';

/**
 * Speaker photo in the Experts frame, or an initials avatar when there's no
 * photo. `priority` marks the above-the-fold profile photo (no lazy loading);
 * `decorative` hides it from assistive tech when the name is shown beside it.
 */
export default function SpeakerPhoto({ speaker, priority = false, decorative = false, className = '' }) {
  if (!speaker.photo) {
    return (
      <div
        {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': speaker.name })}
        className={`${FRAME} flex items-center justify-center rounded-[20px] border-2 border-black bg-[#EDD7FF] font-archivo text-[64px] sm:text-[40px] ${className}`}
      >
        <span aria-hidden="true">{initialsOf(speaker.name)}</span>
      </div>
    );
  }
  return (
    <img
      src={speaker.photo}
      alt={decorative ? '' : speaker.name}
      width="285"
      height="296"
      decoding="async"
      {...(priority ? HERO_IMG_PRIORITY : { loading: 'lazy' })}
      className={`${FRAME} object-cover ${className}`}
    />
  );
}
