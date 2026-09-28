import { Helmet } from 'react-helmet-async';
import { site } from '../content';

const absolute = (url) => (!url ? undefined : /^https?:\/\//.test(url) ? url : `${site.url}${url}`);

/**
 * Per-page <head> tags: title, description, canonical, Open Graph, Twitter,
 * optional JSON-LD. Render exactly once per page.
 *
 * @param {string}  [title]      page title; rendered as "<title> | Gujarat JUG"
 * @param {string}  [fullTitle]  exact title (overrides `title` + suffix)
 * @param {string}  [description] defaults to site.description
 * @param {string}  [path]       root-relative canonical path, e.g. '/events'
 * @param {string}  [image]      root-relative or absolute image URL
 * @param {string}  [type]       og:type (default 'website')
 * @param {object}  [jsonLd]     structured data object
 * @param {boolean} [noindex]    add robots noindex (placeholders, 404)
 */
export default function Seo({
  title,
  fullTitle,
  description = site.description,
  path,
  image = site.ogImage ?? site.logo,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const resolvedTitle = fullTitle ?? (title ? `${title} | ${site.name}` : site.name);
  const canonical = path != null ? absolute(path) : undefined;
  const imageUrl = absolute(image);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.fullName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}
