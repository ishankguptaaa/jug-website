import { site } from '../content';
import { absoluteUrl } from './url';

const CONTEXT = 'https://schema.org';

const isoIst = (date, time) => (time ? `${date}T${time}:00+05:30` : date);

const placeJsonLd = ({ name, address, city }) => ({
  '@type': 'Place',
  name,
  address: address || city ? { '@type': 'PostalAddress', streetAddress: address, addressLocality: city } : undefined,
});

export const organizationJsonLd = () => ({
  '@context': CONTEXT,
  '@type': 'Organization',
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  logo: absoluteUrl(site.logo),
  description: site.description,
  sameAs: [site.socials.linkedin, site.socials.x, site.socials.youtube],
});

/**
 * schema.org Event for an event or conference record.
 * @param {object} entity  event (`date`) or conference (`startDate`/`endDate`)
 * @param {object} opts    { path, description, places: [{ name, address, city, online }], speakers }
 */
export const eventJsonLd = (entity, { path, description, places, speakers }) => {
  const url = absoluteUrl(path);
  const online = places.length > 0 && places.every((p) => p.online);
  const performers = speakers.filter((s) => !s.isSample);
  return {
    '@context': CONTEXT,
    '@type': 'Event',
    name: entity.name,
    description,
    startDate: isoIst(entity.date ?? entity.startDate, entity.startTime),
    endDate: isoIst(entity.date ?? entity.endDate, entity.endTime),
    eventStatus: `${CONTEXT}/EventScheduled`,
    eventAttendanceMode: `${CONTEXT}/${online ? 'Online' : 'Offline'}EventAttendanceMode`,
    location: places.map((p) => (p.online ? { '@type': 'VirtualLocation', url: entity.externalUrl ?? url } : placeJsonLd(p))),
    image: entity.banner ? [absoluteUrl(entity.banner)] : undefined,
    url,
    organizer: { '@type': 'Organization', name: site.fullName, url: site.url },
    performer: performers.length
      ? performers.map((s) => ({ '@type': 'Person', name: s.name, url: absoluteUrl(`/speakers/${s.slug}`) }))
      : undefined,
    offers: entity.registrationUrl ? { '@type': 'Offer', url: entity.registrationUrl } : undefined,
  };
};

export const personJsonLd = (speaker, path) => ({
  '@context': CONTEXT,
  '@type': 'Person',
  name: speaker.name,
  url: absoluteUrl(path),
  image: absoluteUrl(speaker.photo),
  jobTitle: speaker.designation,
  worksFor: speaker.company ? { '@type': 'Organization', name: speaker.company } : undefined,
  description: speaker.bio,
  sameAs: speaker.socials ? Object.values(speaker.socials) : undefined,
});

/** @param {{ name: string, path: string }[]} trail  crumbs after Home, in order */
export const breadcrumbJsonLd = (trail) => ({
  '@context': CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map(({ name, path }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});
