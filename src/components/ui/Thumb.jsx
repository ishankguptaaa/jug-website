export default function Thumb({ photo, className = '' }) {
  return (
    <img
      src={photo.thumb ?? photo.src}
      alt={photo.alt ?? ''}
      width={photo.w}
      height={photo.h}
      loading="lazy"
      decoding="async"
      className={`w-full h-auto aspect-[4/3] object-cover rounded-[24px] sm:rounded-2xl border border-black bg-[#FAFAFA] ${className}`}
    />
  );
}
