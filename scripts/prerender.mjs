#!/usr/bin/env node
// Build-time prerender (npm run build, after the client + SSR builds).
// Renders every route with dist-ssr/entry-server.js into dist/<route>.html
// (served extensionless: vercel.json cleanUrls, vite preview; home →
// dist/index.html, 404 → dist/404.html), then writes sitemap.xml and
// robots.txt and checks that every internal link points at a written page.

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CDJ_2025_SLUG, conferences, events, galleries, site, speakers } from '../src/content/index.js';
import { render } from '../dist-ssr/entry-server.js';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const now = new Date();
const today = now.toISOString().slice(0, 10);
// Content dates as lastmod, but never in the future (upcoming events).
const pastDate = (date) => (date && date <= today ? date : undefined);

const routes = [
  ...['/', '/events', '/conferences', '/speakers', '/gallery', '/partners', '/about'].map((p) => ({ path: p })),
  ...events.map((e) => ({ path: `/events/${e.slug}`, lastmod: pastDate(e.date) })),
  ...conferences.map((c) => ({ path: `/conferences/${c.slug}`, lastmod: pastDate(c.endDate) })),
  ...speakers.map((s) => ({ path: `/speakers/${s.slug}` })),
  ...galleries.map((g) => ({ path: `/gallery/${g.slug}`, lastmod: pastDate(g.date) })),
  { path: '/404' },
];

// The template's default <title> and Helmet-managed (data-rh) tags are
// replaced by each page's own. Read before dist/index.html is overwritten.
const template = (await readFile(path.join(dist, 'index.html'), 'utf8'))
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<(meta|link)\b[^>]*\bdata-rh="true"[^>]*>\s*/g, '');
const ROOT = '<div id="root"></div>';
if (!template.includes(ROOT) || !template.includes('</head>')) throw new Error(`dist/index.html has no ${ROOT}`);

const written = new Map(); // path → html
const indexable = [];

for (const route of routes) {
  const { html, head, pageChrome } = await render(route.path, now);
  const data = JSON.stringify({ path: route.path, now: now.toISOString(), pageChrome }).replace(/</g, '\\u003c');
  const page = template
    .replace('</head>', `${head}</head>`)
    .replace(ROOT, `<div id="root">${html}</div><script id="prerender-data" type="application/json">${data}</script>`);
  const file = path.join(dist, route.path === '/' ? 'index.html' : `${route.path}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  written.set(route.path, page);
  if (!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(head)) indexable.push(route);
}

const loc = (p) => `${site.url}${p}`;
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(({ path: p, lastmod }) => `  <url><loc>${loc(p)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`,
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${loc('/sitemap.xml')}\n`);

// Every internal link must hit a prerendered page or a file in dist
// (unknown URLs 404 on Vercel; the legacy CDJ URL is a vercel.json redirect).
const broken = new Set();
for (const [from, page] of written) {
  for (const [, href] of page.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = href.replace(/(.)\/$/, '$1');
    const ok =
      written.has(target) || target === `/${CDJ_2025_SLUG}` || existsSync(path.join(dist, decodeURIComponent(target)));
    if (!ok) broken.add(`${from} → ${href}`);
  }
}
if (broken.size) throw new Error(`Links to pages that were not prerendered:\n${[...broken].join('\n')}`);

console.log(`Prerendered ${written.size} pages (${indexable.length} in sitemap.xml).`);
