/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image"; // Needed for the new Team component

// --- 1. TOP SECTION: Team/Speaker Lineup (New Code Block) --------------------
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
      <div className="px-[67px] h-[1865px] rounded-bl-[60px] rounded-br-[60px] flex text-black">
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
            <div className="mt-[31px] cursor-write">
              <p className="font-quicksand">
                Yep, we got <span className="font-bold">Vladdy Daddy</span> for
                the keynote. Plus some absolute
                <span className="font-bold"> legends</span> that will also be
                sharing the stage. (More speaker
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
                <div className="px-[16px] py-[6px] ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
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

                <div className="relative w-[420px] h-[470.663px]">
                  <Image
                    src="/t3.avif"
                    alt="Vlad Magdalin"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand">
                    Our GSAP <span className="font-bold">fairy codemother</span>{" "}
                    is here to sprinkle some
                    <span className="font-bold"> tween</span>
                    magic,
                    <span className="font-bold"> animation</span> goodness &
                    Webflow's deepest darkest{" "}
                    <span className="font-bold"> secrets</span> now she's on the
                    inside.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[67px]"></div>

        <div className="pt-[169px] border-l-[2px] border-r-[2px] border-[#D2CCB6] box-border">
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
              <div className="relative w-[420px] h-[470.663px]">
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
                Our founding <span className="font-bold"> Webflow</span> father.
                Our <br /> <span className="font-bold">dad joke</span> aficionado.
                He puts the mad into Magdalin and will be kicking off FlowFest
                '25 as our<span className="font-bold"> keynote</span> speaker!
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
                <div className="px-[16px] ml-[10px] mb-[-40px] py-[6px] absolute border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
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
                <div className="relative w-[420px] h-[470.663px]">
                  <Image
                    src="/t4.avif"
                    alt="Vlad Magdalin"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand">
                    Devs want to<span className="font-bold"> work</span> with
                    her, designers want to <span className="font-bold">be</span>{" "}
                    her. Steph has hit the ground running with her{" "}
                    <span className="font-bold">stunning </span> <br /> web work
                    and will be sharing her expert{" "}
                    <span className="font-bold"> freelancer</span> growth{" "}
                    <span className="font-bold">tips.</span>
                  </p>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[67px]"></div>

        <div className="w-[442px] border-l-[3px] border-r-[3px] border-[#D2CCB6]">
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
                <div className="px-[16px] py-[6px] ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
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
                <div className="relative w-[420px] h-[470.663px]">
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
                  Oh <span className="font-bold">'Eck</span>, we've only gone
                  and secured the web <span className="font-bold">wizard</span>{" "}
                  himself. Co-founder <br /> of <span className="font-bold">
                    Osmo{" "}
                  </span>& Webflow superstar, <br /> we can't wait to learn from
                  <span className="font-bold"> Ilja!</span>
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
                <div className="px-[16px] py-[6px] ml-[-15px] mb-[-40px] border-[1.6px] border-black text-[16.9778px] rounded-full bg-[#F17100] text-white text-[14px] font-semibold leading-none whitespace-nowrap shadow-md">
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
                <div className="relative w-[420px] h-[470.663px]">
                  <Image
                    src="/t5.avif"
                    alt="Ross Plaskow"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="w-[370.638px] flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                  <p className="font-quicksand">
                    We've all wanted to <span className="font-bold">
                      animate
                    </span>{" "}
                    something cool with <span className="font-bold">Rive</span>,
                    and <br />
                    Ross is here to <span className="font-bold">show</span> us
                    how with <br />his ridiculously<span className="font-bold">
                      {" "}
                      fun
                    </span> and
                    <span className="font-bold"> slick</span> style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- 2. MIDDLE SECTION: Community (Previous first code block) -----------------
function CommunitySection() {
  return (
    <div className=" text-black rounded-tl-[60px] rounded-tr-[60px]">
      {" "}
      <div className="pt-[170px]"></div>
      <div className="h-[472px] px-[67px] flex border-t-3 border-b-3 border-[#D2CCB6]">
        <div className="w-[662px]">
          <div className="font-heading-bold pt-[50px] ">
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

          <div className="h-[66px] w-[475px] text-[16.79px] tracking-[0.3px] leading-5 font-regular">
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
  );
}

// --- 3. BOTTOM SECTION: What To Expect (WTE - Main Component) ----------------
export default function WTE() {
  const barsRef = useRef([]);
  const imagesRef = useRef([]);
  const tweensRef = useRef([]);

  useEffect(() => {
    // Initialize GSAP tweens for each image
    tweensRef.current = imagesRef.current.map((img, i) => {
      const isLeft = i % 2 === 0; // Alternate left/right

      // Set initial position (Hidden & Tilted)
      gsap.set(img, {
        opacity: 0,
        scale: 0.8,
        x: isLeft ? -20 : 20,
        // Image is initially slightly tilted (-3 / 3 degrees)
        rotation: isLeft ? -3 : 3,
      });

      // Create paused tween with pop-out effect
      return gsap.to(img, {
        opacity: 1,
        scale: 1,
        x: 0,
        // Animates to a slightly greater tilt (-5 / 5 degrees)
        rotation: isLeft ? -5 : 5,
        duration: 0.4,
        ease: "back.out(1.4)",
        paused: true,

        // **Z-Index Fix:** Ensures the current bar and image stack above siblings
        onStart: () => {
          gsap.set(barsRef.current[i], { zIndex: 100 });
        },
        onReverseComplete: () => {
          gsap.set(barsRef.current[i], { zIndex: 10 });
        },
      });
    });

    // Add event listeners to bars
    barsRef.current.forEach((bar, i) => {
      const tween = tweensRef.current[i];

      const handleMouseEnter = () => {
        tween.timeScale(1).play();
      };

      const handleMouseLeave = () => {
        tween.timeScale(2.5).reverse();
      };

      if (bar) {
        bar.addEventListener("mouseenter", handleMouseEnter);
        bar.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    // Cleanup
    return () => {
      tweensRef.current.forEach((tween) => tween.kill());
    };
  }, []);

  const bars = [
    {
      title: "Expert Talks",
      color: "#F97028",
      border: "#D45F22",
      img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd92bb1ada35b5840_event-image-2.avif",
      side: "left",
      px: "424px",
      width: "264px",
    },
    {
      title: "Fun + Games",
      color: "#F489A3",
      border: "#D0758B",
      img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd04f4257c5f7f85fc_event-image-5.avif",
      side: "right",
      px: "424px",
      width: "264px",
    },
    {
      title: "Food + Drink",
      color: "#F3A20F",
      border: "#CF8A0D",
      img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddb9d81bad24595e36_event-image-4.avif",
      side: "left",
      px: "429px",
      width: "256px",
    },
    {
      title: "Live Music",
      color: "#F0BB0D",
      border: "#CC9F0B",
      img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd1a93d98874d5b679_event-image-3.avif",
      side: "right",
      px: "446px",
      width: "222px",
    },
    {
      title: "Community",
      color: "#F97028",
      border: "#D45F22",
      img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd793e76751328121_event-image-1.avif",
      side: "left",
      px: "433px",
      width: "247px",
    },
  ];

  return (
    <>
      {/* 1. TOP PAGE: Team / Speaker Lineup */}
      <Team />

      {/* 2. MIDDLE PAGE: Community Information and Volunteers */}
      <CommunitySection />

      {/* 3. BOTTOM PAGE: What to Expect (WTE) with Hover Bars */}
      <div className="h-[60px] bg-[linear-gradient(to_right,black_50%,#F97028_50%)]"></div>
      <div
        className="pl-[67px] bg-black flex font-heading-bold relative"
        style={{ zIndex: 1 }}
      >
        <div className="text-white px-11 py-[118px] h-[509px] box-border flex justify-center items-center">
          <div className="h-[272px] w-[122px] font-heading-bold flex justify-center items-center">
            <h2
              className="text-[67.9111px] leading-[0.9] whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textAlign: "center",
                transform: "rotate(180deg)",
              }}
            >
              What to <br /> Expect
            </h2>
          </div>
        </div>

        <div className="pl-[68px]"></div>

        <div className="flex flex-col relative" style={{ zIndex: 10 }}>
          {bars.map((bar, index) => (
            <div
              key={index}
              ref={(el) => {barsRef.current[index] = el}}
              className="h-[102px] w-[1200px] pt-[30px] cursor-pointer relative"
              style={{
                backgroundColor: bar.color,
                borderTop: index > 0 ? "1.6px solid black" : "none",
                borderBottom:
                  index < bars.length - 1 ? `7px solid ${bar.border}` : "none",
                paddingLeft: bar.px,
                zIndex: 10,
              }}
            >
              <div
                className="h-[46px] text-[50.9333px] leading-[45.84px] whitespace-nowrap text-[#FFFEFB]"
                style={{ width: bar.width }}
              >
                {bar.title}
              </div>

              {/* Image */}
              <div
                ref={(el) => {imagesRef.current[index] = el}}
                className="absolute top-[50%] pointer-events-none"
                style={{
                  [bar.side]: "50px",
                  transform: "translateY(-50%)",
                  width: "293.9px",
                  height: "345.325px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "4px solid #1a1a1a",
                  zIndex: 1000,
                }}
              >
                <img
                  src={bar.img}
                  alt={bar.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[60px] bg-[linear-gradient(to_right,black_50%,#F97028_50%)]"></div>
    </>
  );
}