import { getSponsorsForConference, getVenuesForConference, CDJ_2025_SLUG } from '../content';

const CONFERENCE_SLUG = CDJ_2025_SLUG;
const platinumSponsors = getSponsorsForConference(CONFERENCE_SLUG, 'platinum');
const goldSponsors = getSponsorsForConference(CONFERENCE_SLUG, 'gold');
const venueSponsors = getVenuesForConference(CONFERENCE_SLUG);
const communitySupporters = getSponsorsForConference(CONFERENCE_SLUG, 'community-supporter');

// Per-supporter presentation (kept from the original hand-written markup).
const supporterStyles = {
  'rajesh-c': { img: 'mb-5 sm:mb-3 rounded-xl h-[60%] sm:border border-black' },
  'hemal-trivedi': { img: 'mb-6 sm:mb-3 rounded-2xl sm:border-[1.5px] border-[2px] border-black h-[60%]' },
};

const Sponsors = () => {
  return (
    <div className="bg-[#FFF8E2] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[28px] sm:leading-[32px] tracking-[0%]">
              Our Esteemed Sponsors
            </h2>

            <div className="flex space-x-[72px] border  bg-gradient-to-r from-[#FAFAFA] via-[#C5C5C5] to-[#FAFAFA] p-2 mt-5 sm:hidden sm:mt-12 overflow-hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
            </div>

            <div className="  border  bg-gradient-to-r from-[#FAFAFA] via-[#C5C5C5] to-[#FAFAFA] p-2 mt-5 xl:hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
            </div>


            <div className="flex justify-center items-center sm:mt-[25px] mt-[24px] mb-11 sm:mb-4 ">
              <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-y-4 gap-x-8 sm:gap-x-3   rounded-lg md:grid-cols-3 
                      place-items-center text-center">

                {platinumSponsors.map((sponsor) => (
                <a key={sponsor.slug} href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <div className="flex h-[112px] w-[285px] sm:w-[154px] sm:h-[76px] items-center justify-center rounded-3xl 
                      bg-[#FFFFFF] text-gray-400 sm:px-4 cursor-pointer">
                    <img src={sponsor.logo} alt={sponsor.logoAlt ?? sponsor.name} className='' />
                  </div>
                </a>
                ))}

              </div>
            </div>




            <div className="flex space-x-[72px]  bg-gradient-to-r from-[#FFE8AC] via-[#FFC62E] to-[#FFEFC6] p-2  sm:hidden  overflow-hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
            </div>

            <div className=" bg-gradient-to-r from-[#FFE8AC] via-[#FFC62E] to-[#FFEFC6] p-2 mt-5 xl:hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
            </div>


            <div className="flex justify-center items-center sm:mt-[25px] mt-[24px] mb-11 sm:mb-4  ">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-8 sm:gap-y-4 sm:gap-x-4 rounded-lg md:grid-cols-3 
      pl-3 sm:pl-0 place-items-center">
                {goldSponsors.map((sponsor) => (
                <a key={sponsor.slug} href={sponsor.website} target="_blank" rel="noopener noreferrer">
                <div className="flex h-[112px] w-[285px] sm:w-[148px] sm:h-[84px] items-center justify-center rounded-3xl 
        bg-[#FFFFFF] text-gray-400 px-4 sm:px-2">
                  <img src={sponsor.logo} alt={sponsor.logoAlt ?? sponsor.name} />
                </div>
                </a>
                ))}

                {/* <div className="flex h-[112px] w-[285px] sm:w-[148px] sm:h-[84px] items-center justify-center rounded-3xl 
        bg-[#FFFFFF] text-gray-400 sm:col-span-2">
                  Coming Soon
                </div> */}

              </div>
            </div>


            <div className="flex space-x-[72px]  justify-center bg-[#FFFFFF] p-2 mt-5">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                VENUE SPONSOR
              </h3>
            </div>


            <div className="flex sm:mt-[25px] mt-[24px] mb-11 sm:mb-4 pl-3 sm:pl-0 justify-center">

              {venueSponsors.map((venue) => (
              <div key={venue.slug} className="flex h-[112px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 sm:w-[148px] sm:h-[84px]  w-[285px]">
                <a href={venue.website} target="_blank" rel="noopener noreferrer">
                  <div className="flex h-[112px] w-[285px] sm:w-[148px] sm:h-[84px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 px-4 sm:px-2">
                  <img src={venue.logo} alt={venue.logoAlt ?? venue.name} />
                  </div>
                </a>
              </div>
              ))}

            </div>

             <div className="flex space-x-[72px]  bg-[#FFFFFF] p-2 mt-5 sm:hidden justify-center">

              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>
              {/* <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3> */}
            </div>

            <div className="  bg-[#FFFFFF] p-2 mt-5 xl:hidden">

              <h3 className="font-raleway font-bold text-[16px] leading-[16px]  sm:leading-[22px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>

            </div>


            <div className="sm:flex-row flex justify-center sm:mt-[25px] mt-[24px] mb-11 sm:mb-4 pl-3 sm:pl-0 gap-7">


              {communitySupporters.map((supporter) => (
              <div key={supporter.slug} className="flex-row -h-[112px]  w-[285px] sm:w-[148px] sm:-h-[84px] items-center justify-items-center rounded-xl text-black">
                <img src={supporter.logo} alt={supporter.logoAlt ?? supporter.name} className={supporterStyles[supporter.slug]?.img ?? supporterStyles['rajesh-c'].img} onClick={() => window.open(supporter.website, "noopener", "noreferrer")} />
                <p className='text-xl sm:text-sm'><strong>{supporter.name.toUpperCase()}</strong></p>
                <p className='text-lg sm:text-xs text-gray-500'>{`${supporter.designation},`} <br /> <strong>{supporter.company ?? supporter.location}</strong></p>
              </div>
              ))}



               {/* <div className="flex h-[112px] items-center justify-center sm:w-[148px] sm:h-[84px] rounded-3xl bg-[#FFFFFF] text-gray-400   w-[285px]">
                Coming Soon
              </div>



              <div className="flex h-[112px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 sm:w-[148px] sm:h-[84px]   w-[285px]">
                Coming Soon
              </div>



              <div className="flex h-[112px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 sm:w-[148px] sm:h-[84px]  w-[285px]">
                Coming Soon
              </div>  */}



            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsors