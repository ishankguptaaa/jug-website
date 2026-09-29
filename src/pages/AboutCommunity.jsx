import { site } from '../content';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

const AboutCommunity = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-[#D7FFF1]">
      <Container size="xl" className="overflow-hidden">
        <div className="pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px] grid grid-cols-12 sm:grid-cols-1">
          <div className="col-span-6 ps-[110px] pt-[50px] sm:p-0" data-aos="fade-right">
            <h2
              id="about-heading"
              className="font-raleway font-bold text-[40px] leading-[48px] tracking-[1%] sm:text-[24px] sm:leading-[28.8px] mb-8"
            >
              About Community
            </h2>
            <p className="mb-[49px] sm:mb-[36px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              {site.description}
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-3">
              <Button to="/about" shape="card">
                More about us
              </Button>
              <Button href={site.joinUrl} shape="card">
                Join Community
              </Button>
            </div>
          </div>
          <div className="col-span-6 px-[100px] sm:px-0 sm:mt-7" data-aos="fade-left">
            <img
              src="/Img/AboutCommunity.png"
              alt=""
              width="545"
              height="520"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutCommunity;
