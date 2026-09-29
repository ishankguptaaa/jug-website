import Seo from './Seo';
import EmptyState from './ui/EmptyState';
import Container from './ui/Container';
import Pill from './ui/Pill';
import PageHero from './ui/PageHero';

/**
 * Hero + message layout for the 404 page: light-blue hero (continues the
 * header) with the page <h1>, then a warm section holding a lilac EmptyState
 * card, ending with the same bottom spacing the footer expects.
 */
export default function PageShell({ seo, eyebrow, title, intro, card }) {
  return (
    <>
      <Seo {...seo} />
      <PageHero
        top={
          <>
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
          </>
        }
        title={title}
        intro={intro}
      />
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

