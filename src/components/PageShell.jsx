import Seo from './Seo';
import Button from './ui/Button';
import EmptyState from './ui/EmptyState';
import Container from './ui/Container';
import Pill from './ui/Pill';

/**
 * Hero + message layout shared by the "Coming soon" placeholders and the 404
 * page: light-blue hero (continues the header) with the page <h1>, then a
 * warm section holding a lilac EmptyState card, ending with the same bottom
 * spacing the footer expects.
 */
export default function PageShell({ seo, eyebrow, title, intro, card }) {
  return (
    <>
      <Seo {...seo} />
      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
            <img
              src="/Img/duke-logo-svg.svg"
              alt=""
              width="463"
              height="483"
              className="mx-auto w-[140px] h-auto sm:w-[90px]"
            />
            {eyebrow ? (
              <Pill as="p" tone="bg-[#FFFCEF] border-[#E8C52A]" className="mt-6">
                {eyebrow}
              </Pill>
            ) : null}
            <h1 className="mt-6 font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] md:text-[44px] md:leading-[52px]">
              {title}
            </h1>
            {intro ? (
              <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
                {intro}
              </p>
            ) : null}
          </div>
        </Container>
      </section>
      <section className="bg-[#FFFCEF]">
        <Container>
          <div className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
            <EmptyState {...card} />
          </div>
        </Container>
      </section>
    </>
  );
}

/** Standard actions: back home (internal) + join the community (external). */
export function HomeAndJoinActions({ joinUrl }) {
  return (
    <>
      <Button to="/">Back to homepage</Button>
      {joinUrl ? <Button href={joinUrl}>Join Community</Button> : null}
    </>
  );
}
