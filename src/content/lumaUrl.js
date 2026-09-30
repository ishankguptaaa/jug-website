// Luma link helpers shared by the build-time sync, the event list and the pages.

/**
 * Canonical form of a Luma event URL (lu.ma -> luma.com, lowercase host, no
 * query, hash or trailing slash), or undefined when it isn't a Luma URL.
 */
export function lumaKey(url) {
  try {
    const { hostname, pathname } = new URL(url);
    const host = hostname.toLowerCase().replace(/^www\./, '').replace(/^lu\.ma$/, 'luma.com');
    if (host !== 'luma.com' && !host.endsWith('.luma.com')) return undefined;
    return `https://${host}${pathname.replace(/\/+$/, '')}`;
  } catch {
    return undefined;
  }
}

export const isLumaUrl = (url) => lumaKey(url) !== undefined;

/** Set of the Luma keys used by `externalUrl` / `registrationUrl` in a list of events. */
export const lumaKeysOf = (events) =>
  new Set(events.flatMap((e) => [e.externalUrl, e.registrationUrl]).map(lumaKey).filter(Boolean));
