"use client";
export default function Community() {
  return (
    <> 
    <div className=" text-black rounded-tl-[60px] rounded-tr-[60px] mt-[-60px] relative bg-[#F3ECD2] "> <div className="pt-[170px]"></div>
      <div className="relative lg:h-[472px] px-4 md:px-[30px] lg:px-[67px] flex flex-col md:flex-col lg:flex-row lg:border-t-3 lg:border-b-3 border-[#D2CCB6] items-center md:items-center lg:items-stretch justify-center md:justify-center lg:justify-start">
            <div className="hidden lg:block absolute h-[22px] w-screen ml-[-67px] mt-[215px] top-2 border-t-3 border-b-3 text-[transparent] border-[#D2CCB6]">a</div>

       
        <div className="w-full lg:w-[662px] order-1 md:order-1 lg:order-1 flex flex-col items-center md:items-center lg:items-start">
          <div className="font-heading-bold pt-[30px] lg:pt-[50px] text-center md:text-center lg:text-left">
            <p className="text-[32px] lg:text-[68.9722px] leading-[38px] lg:leading-[62.075px]">
              An Event Ran by <br /> The Community,
            </p>
            <div className="rotate-[1deg] h-auto lg:h-[69px] w-full lg:w-[555px] bg-[#F3A20F] border-[1.6px] border-black shadow-[rgba(0,0,0,0.2)] rounded-md shadow-[0px_6px_0px_0px_#000] text-nowrap text-white mt-[15px] lg:mt-0">
              <p className="text-[24px] lg:text-[62.075px] leading-[32px] lg:leading-[55.8675px] px-[15.5188px] py-[8px] lg:pt-[9.31125px] lg:py-0">
                For The Community
              </p>
            </div>
          </div>
          <div className="mt-[20px] lg:mt-[33px]"></div>

          <div className="h-auto lg:h-[66px] w-full lg:w-[475px] text-[14px] lg:text-[16.9778px] tracking-[0.3px] lg:leading-[22.0711px] leading-[18px] font-regular text-center md:text-center lg:text-left">
            <p className="font-quicksand">
              This is a <span className="font-bold">non-profit</span> event run
              by
              <span className="font-bold"> volunteer</span> community members. At
              FlowFest our motivation is to lead with kindness
              <span className="font-bold"></span>,
              <span className=""> inclusivity</span>, support and{" "}
              <span className="font-bold">FUN</span>, obvs.
            </p>
          </div>

          <div className="pt-[20px] lg:pt-[33px]"></div>
          <div className="pt-[6px]">
            {" "}
            <button
              className="
              cursor-pointer
              
              flex items-center justify-center
              border-2 border-[#121212]
              rounded-[170.667px]
              w-[138.5px] h-[46.925px]
              px-[21.3333px] py-[1.70667px]
              text-[#121212] text-[17.0667px] font-normal leading-[17.0667px]
              bg-[#f489a3]
              whitespace-nowrap
              shadow-[0px_4.26667px_0px_0px_rgba(0,0,0,0.15)]
              transition-all duration-200 ease-out
              hover:translate-y-[4.26667px] hover:shadow-none
              active:translate-y-[4.26667px] active:shadow-none
            "
            >
              Buy Tickets
            </button>
          </div>
        </div>

        <div className="pl-0 lg:pl-[67px] flex items-center justify-center w-full lg:w-auto order-2 md:order-2 lg:order-2 mb-[30px] md:mb-[30px] lg:mb-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-5 w-full md:w-auto lg:w-auto">
            {[
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b372a58a085d771d7ef_isabel-adwards.avif",
                name: "Isabel Edwards",
                tilt: 3,
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b4353290cb0e6475221_josh-fry.avif",
                name: "Josh Fry",
                tilt: -3,
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b37993d2c764032cfd9_benn-raistrick.avif",
                name: "Benn Raistrick",
                tilt: 2,
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b37d5ee1f02cd6d1e51_scott-humphrey.avif",
                name: "Scott Humphrey",
                tilt: -2,
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b372d28c1d2ba84fed6_rachael-ward.avif",
                name: "Rachael Ward",
                tilt: 4,
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b375c636519ba78e184_john-ostler.avif",
                name: "John Ostler",
                tilt: -4,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative w-full lg:w-[206px] h-[140px] md:h-[227px] lg:h-[227px] transition-transform duration-300"
                style={{ transform: "rotate(0deg)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = `rotate(${item.tilt}deg)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg)")
                }
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-3xl border-2"
                />
                <div className="absolute h-auto md:h-[36px] lg:h-[36px] rounded-2xl text-center w-[calc(100%-12px)] bottom-2 left-[6px] md:w-[172px] lg:w-[172px] md:ml-[18px] lg:ml-[18px] md:bottom-4 lg:bottom-4 bg-white text-black border-[1.6px] text-[12px] md:text-[16.9778px] lg:text-[16.9778px] font-bold px-2 py-1">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}