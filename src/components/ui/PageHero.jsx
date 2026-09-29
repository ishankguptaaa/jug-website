import Container from './Container';

export default function PageHero({ title, intro, children }) {
  return (
    <section className="bg-[#E1EEFB]">
      <Container size="xl" className="sm:max-w-[345px]">
        <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
          <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] md:text-[44px] md:leading-[52px] break-words">
            {title}
          </h1>
          <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
            {intro}
          </p>
          {children ? <div className="mt-8 sm:mt-6 flex justify-center">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function DetailHero({ children }) {
  return (
    <section className="bg-[#E1EEFB]">
      <Container size="xl" className="sm:max-w-[345px]">
        <div className="grid grid-cols-12 gap-10 md:gap-8 sm:gap-6 items-center pt-12 pb-[80px] sm:pt-6 sm:pb-[40px]">
          {children}
        </div>
      </Container>
    </section>
  );
}
