/* eslint-disable @next/next/no-img-element */
// Example: import images at top if needed
// import img1 from "@/public/img1.png";
// import img2 from "@/public/img2.png";
// import img3 from "@/public/img3.png";
// import img4 from "@/public/img4.png";
// import img5 from "@/public/img5.png";
// import img6 from "@/public/img6.png";
"use client";
export default function Community() {
  return (
    <> 
    <div className=" text-black rounded-tl-[60px] rounded-tr-[60px] mt-[-60px] relative bg-[#F3ECD2] "> <div className="pt-[170px]"></div>
      <div className="relative h-[472px] px-[67px]  flex  border-t-3 border-b-3 border-[#D2CCB6]">
            <div className=" absolute h-[22px] w-screen ml-[-67px] mt-[215px] top-2 border-t-3 border-b-3 text-[transparent] border-[#D2CCB6]">a</div>

       
        <div className="w-[662px]">
          <div className="font-heading-bold  pt-[50px] ">
            <p className="leading-[62.075px] text-[68.9722px]">
              An Event Ran by <br /> The Community,
            </p>
            <div className="rotate-[1deg] h-[69px] w-[555px] bg-[#F3A20F] border-[1.6px] border-black shadow-[rgba(0,0,0,0.2)] rounded-md shadow-[0px_6px_0px_0px_#000] text-nowrap text-white">
              <p className="leading-[55.8675px] text-[62.075px] px-[15.5188px] pt-[9.31125px] ">
                For The Community
              </p>
            </div>
          </div>
          <div className="mt-[33px]"></div>

          <div className="h-[66px] w-[475px] text-[16.9778px] tracking-[0.3px] leading-[22.0711px] font-regular">
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

          <div className="pt-[33px]"></div>
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

        <div className="pl-[67px] flex items-center">
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b372a58a085d771d7ef_isabel-adwards.avif",
                name: "Isabel Edwards",
                tilt: 3, // tilt right 3deg
              },
              {
                src: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682c8b4353290cb0e6475221_josh-fry.avif",
                name: "Josh Fry",
                tilt: -3, // tilt left 3deg
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
                className="relative w-[206px] h-[227px] transition-transform duration-300"
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
                <div className="absolute h-[36px] rounded-2xl text-center w-[172px] ml-[18px] bottom-4 bg-white text-black border-[1.6px] text-[16.9778px] font-bold px-2 py-1">
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
