// Photo galleries. A gallery points to ONE of `event` or `conference` (slug);
// galleries for an event/conference are derived via selectors.js.
//
// Fields:
//   slug, title
//   event? / conference?   slug of what the photos are from
//   date                   'YYYY-MM-DD' (used for grouping by year)
//   cover                  root-relative image path
//   photos[]               [{ src, thumb?, alt, w, h }]  (w/h in px, to avoid layout shift)
//   isSample?
//
// Photo files: public/gallery/<slug>/full/<name>.webp (src, shown in the
// lightbox) and public/gallery/<slug>/thumbs/<name>.webp (thumb, shown in
// grids; falls back to src when omitted).

const thumb = (n) => `/gallery/sample-meetup-java-records-deep-dive-photos/thumbs/photo-${n}.webp`;

export const galleries = [
  // ---- Sample gallery (placeholder — reuses images already in public/) ----
  {
    slug: 'sample-meetup-java-records-deep-dive-photos',
    title: 'Sample Gallery: Java Records Deep Dive',
    event: 'sample-meetup-java-records-deep-dive',
    date: '2025-11-15',
    cover: thumb(1),
    photos: [
      { src: '/Home/event-banner.webp', thumb: thumb(1), alt: 'Sample photo 1', w: 1200, h: 612 },
      { src: '/Img/AboutEvent.webp', thumb: thumb(2), alt: 'Sample photo 2', w: 1133, h: 1150 },
      { src: '/Img/AboutCommunity.webp', alt: 'Sample photo 3', w: 545, h: 520 },
      { src: '/Workshop/WorkShop.webp', alt: 'Sample photo 4', w: 421, h: 500 },
    ],
    isSample: true,
  },
];
