// Native events (events.js) plus the meetups synced from Luma at build time
// (generated/luma-events.json, written by scripts/sync-luma.mjs).
// Native wins on a slug clash or when it already uses the same Luma URL.

import { events as nativeEvents } from './events.js';
import lumaEvents from './generated/luma-events.json' with { type: 'json' };
import { lumaKey, lumaKeysOf } from './lumaUrl.js';

const nativeSlugs = new Set(nativeEvents.map((e) => e.slug));
const nativeLumaKeys = lumaKeysOf(nativeEvents);

export const events = [
  ...nativeEvents,
  ...lumaEvents.filter((e) => !nativeSlugs.has(e.slug) && !nativeLumaKeys.has(lumaKey(e.externalUrl))),
];
