// Single AOS initialisation for the whole app (called once from SiteLayout).
// AOS's own MutationObserver picks up [data-aos] nodes added later by lazy
// routes, so pages must not call AOS.init themselves (each call would add
// another set of scroll/resize listeners and observers).
// Only call from useEffect / event handlers — AOS touches window/document.
import AOS from 'aos';

let initialised = false;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Idempotent AOS.init; disabled for reduced-motion users (index.css also un-hides [data-aos] for them). */
export function initAOS() {
  if (initialised) return;
  initialised = true;
  AOS.init({ duration: 1000, disable: prefersReducedMotion });
}
