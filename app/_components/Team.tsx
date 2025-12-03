"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

function Team() {
  const cursor1Ref = useRef(null);
  const container1Ref = useRef(null);
  const cursor2Ref = useRef(null);
  const container2Ref = useRef(null);
  const cursor3Ref = useRef(null);
  const container3Ref = useRef(null);
  const cursor4Ref = useRef(null);
  const container4Ref = useRef(null);
  const cursor5Ref = useRef(null);
  const container5Ref = useRef(null);

  useEffect(() => {
    const setupCursor = (cursorEl, containerEl) => {
      if (!cursorEl || !containerEl) return;

      // Set initial position at bottom center of image
      const centerX = containerEl.offsetWidth / 2 - 94;
      const bottomY = containerEl.offsetHeight - 62;
      gsap.set(cursorEl, { x: centerX, y: bottomY });

      const moveCursor = (e) => {
        const rect = containerEl.getBoundingClientRect();
        const x = e.clientX - rect.left - 20;
        const y = e.clientY - rect.top - 20;
        gsap.to(cursorEl, {
          x,
          y,
          duration: 0.25,
          ease: "power3.out",
        });
      };

      const leaveCursor = () => {
        const rect = containerEl.getBoundingClientRect();
        const centerX = containerEl.offsetWidth / 2 - 94;
      const bottomY = containerEl.offsetHeight - 62;
        gsap.to(cursorEl, {
          x: centerX,
          y: bottomY,
          duration: 0.45,
          ease: "power4.out",
        });
      };

      containerEl.addEventListener("mousemove", moveCursor);
      containerEl.addEventListener("mouseleave", leaveCursor);

      return () => {
        containerEl.removeEventListener("mousemove", moveCursor);
        containerEl.removeEventListener("mouseleave", leaveCursor);
      };
    };

    const cleanup1 = setupCursor(cursor1Ref.current, container1Ref.current);
    const cleanup2 = setupCursor(cursor2Ref.current, container2Ref.current);
    const cleanup3 = setupCursor(cursor3Ref.current, container3Ref.current);
    const cleanup4 = setupCursor(cursor4Ref.current, container4Ref.current);
    const cleanup5 = setupCursor(cursor5Ref.current, container5Ref.current);

    return () => {
      cleanup1?.();
      cleanup2?.();
      cleanup3?.();
      cleanup4?.();
      cleanup5?.();
    };
  }, []);

  return (
    <>
<div className="px-[67px] h-[1865px] rounded-bl-[60px] rounded-br-[60px] flex text-black mb-[-60px] relative  bg-[#F3ECD2]">
        <div className="w-[422px] border-l-[3px] border-r-[3px] border-[#D2CCB6]">
          <div className="pt-[278px] pl-[33px] pr-[122px]">
            <h2 className="cursor-write text-[68.9722px] font-heading-bold text-nowrap leading-[62.075px]">
              Our 2025
            </h2>

            <div className="h-[75.2625px] w-[256.663px] relative inline-block">
              <h2 className="relative z-20 text-[65.5326px] shadow-[0px_6px_0px_0px] shadow-[rgba(0,0,0,0.2)] leading-[68.9722px] font-heading-bold text-white bg-[#F3A20F] px-[16px] pt-[6px] border-[1.6] border-black rounded-sm rotate-[-1deg]">
                Speaker
              </h2>
            </div>
            <div>
              <h2 className="w-[218px] ml-2 rotate-[2deg] text-[65.5326px] leading-[68.9722px] font-heading-bold text-white bg-[#F97028] border-[1.6] border-black rounded-sm px-[16px]">
                Lineup
              </h2>
            </div>
            <div className="mt-[31px] cursor-write leading-[22.0711px] text-[16.9778px] w-[271.638px]">
              <p className="font-quicksand">
                Yep, we got <span className="font-bold">Vladdy Daddy</span> for the keynote. Plus some absolute
                <span className="font-bold"> legends</span> that will also be sharing the stage. (More speaker
                <span className="font-bold"> announcenemts</span> to come!)
              </p>
            </div>

            <div className="mt-[33px]">
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

          <div className="mt-[265px]">
            <div className="h-[46.6875px] w-[120px] mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative">
              Animation
            </div>
            <div className="cursor-blind relative">
              <div
                ref={cursor1Ref}
                className="absolute z-50 pointer-events-none flex items-center gap-[8px]"
                style={{ transform: "translate(0, 0)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                    fill="#F17100"
                    stroke="#121212"
                    strokeWidth="2"
                  ></path>
                </svg>
                <div className="px-[16px] py-[6px]  ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
                  Casie Evans
                </div>
              </div>
              <div
                ref={container1Ref}
                className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
              >
                <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>

               <div className="relative w-[414.375px]  h-[470.663px]">
                <Image
                  src="/t3.avif"
                  alt="Vlad Magdalin"
                  fill
                  className="object-cover"
                />
              </div>
</div>
                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand ">
                    Our GSAP <span className="font-bold">fairy codemother</span> is here to sprinkle some<span className="font-bold"> tween</span>
                    magic,<span className="font-bold"> animation</span> goodness & Webflow's deepest darkest <span className="font-bold"> 
                      secrets</span> now she's on the inside.
                  </p>
                </div>
              
            </div>
          </div>
        </div>

        <div className="ml-[67px]"></div>

        <div className="pt-[169px] w-[420px] border-l-[2px] border-r-[2px] border-[#D2CCB6] box-border">
          <div className="h-[46.6875px] w-[105.4px] mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative">
            Keynote
          </div>
          <div className="cursor-blind relative">
            <div
              ref={cursor2Ref}
              className="absolute z-50 pointer-events-none flex items-center gap-[8px]"
              style={{ transform: "translate(0, 0)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                className=""
              >
                <path
                  d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                  fill="#F17100"
                  stroke="#121212"
                  strokeWidth="2"
                ></path>
              </svg>
              <br />
              <div className="px-[16px] h-[36px] ml-[-25px] mb-[-40px] py-[6px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
                Vlad Magdalin
              </div>
            </div>
            <div
              ref={container2Ref}
              className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
            >
              <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
              <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
              <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
              <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
              <div className="relative w-[414.375px] h-[470.663px]">
                <Image
                  src="/t1.avif"
                  alt="Vlad Magdalin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
              <p className="font-quicksand">
                     Our founding <span className="font-bold"> Webflow</span>  father. Our <br /> <span className="font-bold">dad joke</span> aficionado. He puts
                the mad into Magdalin and will be kicking off FlowFest '25 as
                our<span className="font-bold"> keynote</span>  speaker!
              </p>
            </div>
          </div>

          <div className="mt-[63px]">
            <div className="h-[46.6875px] w-[93px] mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative">
              Design
            </div>

            <div className="cursor-blind relative">
              <div
                ref={cursor3Ref}
                className="absolute z-50 pointer-events-none flex items-center gap-[8px]"
                style={{ transform: "translate(0, 0)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                    fill="#F17100"
                    stroke="#121212"
                    strokeWidth="2"
                  ></path>
                </svg>
                <div className="px-[16px]  ml-[10px] mb-[-40px] py-[6px] absolute border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
                  Stephanie Bruce
                </div>
              </div>
              <div
                ref={container3Ref}
                className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
              >
                <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="relative w-[414.375px] h-[470.663px]">
                <Image
                  src="/t4.avif"
                  alt="Vlad Magdalin"
                  fill
                  className="object-cover"
                />
              </div> 
              </div>
                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand">
                    Devs want to<span className="font-bold"> work</span> with her, designers want to <span className="font-bold">be</span> her. Steph
                    has hit the ground running with her <span className="font-bold">stunning </span> <br /> web work and
                    will be sharing her expert <span className="font-bold"> freelancer</span> growth <span className="font-bold">tips.</span>
                  </p>
                </div>{" "}
             
            </div>
          </div>
        </div>

        <div className="ml-[67px]"></div>

        <div className="w-[420px] border-l-[3px] border-r-[3px] border-[#D2CCB6]">
          <div className="mt-[341px]">
            <div className="h-[46.6875px] w-[147px] mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative">
              Development
            </div>

            <div className="cursor-blind relative">
              <div
                ref={cursor4Ref}
                className="absolute z-50 pointer-events-none flex items-center gap-[8px]"
                style={{ transform: "translate(0, 0)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                    fill="#F17100"
                    stroke="#121212"
                    strokeWidth="2"
                  ></path>
                </svg>
                <div className="px-[16px] py-[6px]  ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
                  Ilja van Eck
                </div>
              </div>
              <div
                ref={container4Ref}
                className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
              >
                <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                 <div className="relative w-[412.375px] h-[470.663px]">
                <Image
                  src="/t2.avif"
                  alt="Vlad Magdalin"
                  fill
                  className="object-cover"
                />
              </div>
              </div>
              <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                <p className="font-quicksand">
                  Oh <span className="font-bold">'Eck</span>, we've only gone and secured the web <span className="font-bold">wizard</span> himself.
                  Co-founder <br /> of <span className="font-bold">Osmo </span>& Webflow superstar, <br /> we can't wait to learn
                  from<span className="font-bold"> Ilja!</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[63px]">
            <div className="h-[46.6875px] w-[120px] mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative">
              Animation
            </div>

            <div className="cursor-blind relative">
              <div
                ref={cursor5Ref}
                className="absolute z-50 pointer-events-none flex items-center gap-[8px]"
                style={{ transform: "translate(0, 0)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                    fill="#F17100"
                    stroke="#121212"
                    strokeWidth="2"
                  ></path>
                </svg>
                <div className="px-[16px] py-[6px]  ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
                  Ross Plaskow
                </div>
              </div>
              <div
                ref={container5Ref}
                className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
              >
                <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
                <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
              <div className="relative w-[412.375px] h-[470.663px]">
                <Image
                  src="/t5.avif"
                  alt="Vlad Magdalin"
                  fill
                  className="object-cover"
                />
              </div>
</div>
                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand">
                    We've all wanted to <span className="font-bold">animate</span> something cool with <span className="font-bold">Rive</span>, and <br />
                    Ross is here to <span className="font-bold">show</span> us how with  <br />his ridiculously<span className="font-bold"> fun</span> and
                    <span className="font-bold"> slick</span> style.
                  </p>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
