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

export const galleries = [
];
