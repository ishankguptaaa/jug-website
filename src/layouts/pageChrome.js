import { useEffect, useLayoutEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { site } from '../content';

// Per-page settings for the shared header, declared by the page itself
// instead of being special-cased by path in the layout.
//   headerTone: background class so the header blends into the page hero
//   activeNav:  main-nav path to highlight (when the URL doesn't sit under it,
//               e.g. the legacy CDJ 2025 URL → '/conferences')
//   headerCta:  { label, href } for the header's right-hand button
//               (defaults to the site-wide "Join Community" link)
export const DEFAULT_PAGE_CHROME = {
  headerTone: 'bg-[#E1EEFB]',
  activeNav: null,
  headerCta: { label: 'Join Community', href: site.joinUrl },
};

// useLayoutEffect on the client (applied before paint → no colour flash),
// useEffect on the server (avoids React's SSR warning; prerender uses defaults).
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Call from a route page to override the header chrome while it is mounted. */
export function usePageChrome({ headerTone, activeNav, headerCta } = {}) {
  const { setPageChrome } = useOutletContext() ?? {};
  const ctaLabel = headerCta?.label;
  const ctaHref = headerCta?.href;
  useIsomorphicLayoutEffect(() => {
    if (!setPageChrome) return undefined;
    setPageChrome({
      headerTone: headerTone ?? DEFAULT_PAGE_CHROME.headerTone,
      activeNav: activeNav ?? DEFAULT_PAGE_CHROME.activeNav,
      headerCta: ctaLabel && ctaHref ? { label: ctaLabel, href: ctaHref } : DEFAULT_PAGE_CHROME.headerCta,
    });
    return () => setPageChrome(DEFAULT_PAGE_CHROME);
  }, [setPageChrome, headerTone, activeNav, ctaLabel, ctaHref]);
}
