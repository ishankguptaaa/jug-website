// Small pure display formatters for content values.

/**
 * 'HH:mm' (24h) -> 'hh:mm' on a 12-hour clock without am/pm,
 * e.g. '13:00' -> '01:00', '09:15' -> '09:15', '00:30' -> '12:30'.
 * Returns the input unchanged if it isn't 'HH:mm'.
 */
export function formatTime12(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time ?? '');
  if (!match) return time;
  const hours = Number(match[1]) % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${match[2]}`;
}

/** 'HH:mm' pair -> 'hh:mm - hh:mm' (12-hour, no am/pm), as used by the event schedule. */
export const formatTimeRange12 = (startTime, endTime) =>
  `${formatTime12(startTime)} - ${formatTime12(endTime)}`;
