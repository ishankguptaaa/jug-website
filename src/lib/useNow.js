import { useEffect, useState } from 'react';

/**
 * Current time, set on the client after mount (null during prerender/SSR and
 * the first client render) so time-dependent UI never causes a hydration
 * mismatch. Refreshes every `intervalMs` (default 5 min).
 */
export function useNow(intervalMs = 5 * 60 * 1000) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
