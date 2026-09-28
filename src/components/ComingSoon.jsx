import { site } from '../content';
import PageShell, { HomeAndJoinActions } from './PageShell';

/**
 * Styled placeholder for routes whose real page lands in a later phase.
 * Marked noindex so search engines don't index thin placeholder pages.
 * `links`: optional extra buttons shown before the default actions.
 */
export default function ComingSoon({ title, intro, path, seoTitle, links }) {
  return (
    <PageShell
      seo={{ title: seoTitle ?? title, description: intro, path, noindex: true }}
      eyebrow="Coming soon"
      title={title}
      intro={intro}
      card={{
        title: 'We are building this page',
        message: `Until it is ready, join the ${site.name} community to hear about meetups, conferences and talks first.`,
        action: (
          <>
            {links}
            <HomeAndJoinActions joinUrl={site.joinUrl} />
          </>
        ),
      }}
    />
  );
}
