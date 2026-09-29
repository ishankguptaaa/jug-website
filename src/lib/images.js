// Banners ship as <name>.webp (1200w) plus <name>-640.webp for small screens/cards.
export const BANNER_SIZES = '(min-width: 1024px) 640px, 100vw';

export const bannerSmall = (src) => src.replace(/\.webp$/, '-640.webp');

export const bannerSrcSet = (src) => `${bannerSmall(src)} 640w, ${src} 1200w`;
