import 'aos/dist/aos.css'; 
import { getFeaturedSpeakers } from '../content';
import SpeakerRole from '../components/speakers/SpeakerRole';

const experts = getFeaturedSpeakers();

const Experts = () => {


  return (
    <div className="bg-[#FFFCEF] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
          <div className="flex justify-between items-center sm:flex-col">
          <h2 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">
            Here Come the 
            <span className="relative inline-block ml-4 sm:ml-2">
              Experts!
              <img src="/Experts/squiggly_line.svg" 
                  alt="Squiggly underline" 
                  className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:w-[60px] sm:hidden" />
            </span>
          </h2>
            {/* <button className="bg-[#FFFFFF] text-black px-7 py-[19px] sm:px-0 sm:py-[6px] rounded-2xl transition border border-black sm:text-[12px]">
              Register as Speaker
            </button> */}
          <button className="relative px-7 py-[19px] text-black border border-black rounded-2xl bg-white overflow-hidden transition-all duration-300 group sm:px-3 sm:py-[6px] sm:text-[12px] sm:mt-3">
            <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300 sm:text-[12px]">
              Submit Your Talk
            </span>
          </button>
          </div>

          <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-x-6 pt-[48px] sm:pt-[20px] ">
            {experts.map((expert, index) => (
              <div key={expert.slug} className="sm:text-center"  data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
                <img src={expert.photo} alt={expert.name} className=" sm:w-[320px] " />
                <h2 className="pt-6 sm:pt-3 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[20px]">{expert.name}</h2>
                <SpeakerRole speaker={expert} className="font-normal text-[16px] leading-[18px] sm:text-[12px] sm:leading-[18px] pt-2 sm:pt-1" />

              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Experts