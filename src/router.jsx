import { lazy } from 'react';
import { Navigate, matchRoutes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import { CDJ_2025_SLUG } from './content';

// Every page is its own chunk (SiteLayout wraps them in <Suspense>). Once
// preloaded, the lazy component resolves synchronously, so the prerender can
// use renderToString and hydration never suspends on the page chunk.
function lazyRoute(load) {
  let module;
  const preload = () => load().then((m) => (module = m));
  const Component = lazy(() => (module ? { then: (resolve) => resolve(module) } : preload()));
  return { Component, preload };
}

export const routes = [
  {
    element: <SiteLayout />,
    children: [
      { index: true, ...lazyRoute(() => import('./routes/HomePage')) },
      { path: 'events', ...lazyRoute(() => import('./routes/EventsPage')) },
      { path: 'events/:slug', ...lazyRoute(() => import('./routes/EventDetailPage')) },
      { path: 'conferences', ...lazyRoute(() => import('./routes/ConferencesPage')) },
      { path: 'conferences/:slug', ...lazyRoute(() => import('./routes/ConferenceDetailPage')) },
      // Legacy URL (shared widely); vercel.json also redirects it.
      { path: CDJ_2025_SLUG, element: <Navigate replace to={`/conferences/${CDJ_2025_SLUG}`} /> },
      { path: 'speakers', ...lazyRoute(() => import('./routes/SpeakersPage')) },
      { path: 'speakers/:slug', ...lazyRoute(() => import('./routes/SpeakerDetailPage')) },
      { path: 'gallery', ...lazyRoute(() => import('./routes/GalleryPage')) },
      { path: 'gallery/:slug', ...lazyRoute(() => import('./routes/GalleryDetailPage')) },
      { path: 'partners', ...lazyRoute(() => import('./routes/PartnersPage')) },
      { path: 'about', ...lazyRoute(() => import('./routes/AboutPage')) },
      { path: '*', ...lazyRoute(() => import('./routes/NotFoundPage')) },
    ],
  },
];

/** Loads the page chunk(s) matched by `pathname` (before prerendering / hydrating it). */
export const preloadRoute = (pathname) =>
  Promise.all((matchRoutes(routes, pathname) ?? []).map(({ route }) => route.preload?.()));
