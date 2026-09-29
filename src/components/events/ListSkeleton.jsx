// Placeholder cards shown until the client knows the current time (useNow),
// reserving roughly the space the real cards take to avoid layout shift.
import { GRID } from './eventsGrid';

const BLOCK = 'border border-[#C5C5C5] rounded-[24px] bg-white motion-safe:animate-pulse';

export default function ListSkeleton({ variant = 'full', count = 3 }) {
  return (
    <div aria-hidden="true" className={GRID}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`${BLOCK} ${variant === 'full' ? 'h-[620px] sm:h-[560px]' : 'h-[140px]'} ${
            i > 0 ? 'sm:hidden' : ''
          } ${i > 1 ? 'md:hidden' : ''}`}
        />
      ))}
    </div>
  );
}
