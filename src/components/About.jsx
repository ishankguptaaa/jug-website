import { site } from '../content';
import Button from './ui/Button';

const About = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="grid grid-cols-12 sm:grid-cols-1">
      {/* Grid Item 1 */}
      <div
        className="col-span-6 ps-[110px] pt-[50px] sm:p-0"
        data-aos="fade-right"
      >
        <h2 className="font-raleway font-bold text-[40px] leading-[48px] tracking-[1%] text-colour-text sm:text-[24px] sm:leading-[28.8px] mb-8">
          {title}
        </h2>

        {/* Handle multiple paragraphs */}
        {Array.isArray(description) ? (
          description.map((para, index) => (
            <p
              key={index}
              className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px] tracking-[0%]"
            >
              {para}
            </p>
          ))
        ) : (
          <p className="mb-[49px] sm:mb-[36px] font-raleway font-normal text-[18px] leading-[30px] tracking-[0%]">
            {description}
          </p>
        )}

        <Button
          href={site.joinUrl}
          shape="px-7 py-5 sm:px-4 sm:py-2 rounded-2xl border-2"
          labelClassName="sm:text-[12px]"
        >
          {buttonText}
        </Button>
      </div>

      {/* Grid Item 2 */}
      <div
        className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-7"
        data-aos="fade-left"
      >
        <img src={imageUrl} alt="About Community" className=""/>
      </div>
    </div>
  );
};

export default About;
