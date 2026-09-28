// Border width, radius, padding and font live in `shape` (not in the base)
// because conflicting Tailwind utilities are resolved by stylesheet order,
// not class-string order.
export const BUTTON_SHAPES = {
  // Experts / Volunteer section buttons
  default: 'border rounded-2xl px-7 py-[19px] sm:px-3 sm:py-[6px] sm:text-[12px]',
  // Header "Join Community"
  header: 'border-2 rounded-lg px-7 py-5 font-medium',
};
