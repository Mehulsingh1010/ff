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
      // Note: The magic numbers (94, 62, 20) are highly dependent on the cursor/image size and should ideally be calculated dynamically or defined as variables.
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
        // Re-calculate on leave in case of resize while hovering
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

    // A resize listener could be added here to re-calculate the initial position on window resize
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

  // Separate components for each speaker block for cleaner rendering and reordering
  const SpeakerBlock = ({ cursorRef, containerRef, imageSrc, altText, category, description, name }) => (
    <div className="mt-[63px] first:mt-[265px] md:first:mt-[63px] lg:first:mt-[265px]">
      <div className="h-[46.6875px] w-auto mb-[-23px] bg-white border-[1.6px] z-10 mx-auto rounded-lg text-[16.9778px] flex items-center justify-center relative px-4">
        {category}
      </div>
      <div className="cursor-blind relative">
        <div
          ref={cursorRef}
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
            {name}
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative h-[470.66px] border-[1.6px] shadow-[rgba(0,0,0,0.2)] shadow-[6px_8px_0px_0px_#CFC9B3] mx-auto cursor-blind"
        >
          {/* Corner Markers */}
          <div className="absolute -top-[12px] -left-[14px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
          <div className="absolute -top-[12px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
          <div className="absolute -bottom-[10px] -left-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>
          <div className="absolute -bottom-[10px] -right-[10px] w-[20px] h-[20px] bg-white border-[1.6px] border-black z-20"></div>

          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
          <p className="font-quicksand">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    // Responsive Padding and Height
    // h-auto to prevent fixed height on mobile/tablet
    <div className="px-[20px] md:px-[40px] lg:px-[67px] pt-[60px] lg:pt-0 mt-[-34px] h-auto rounded-bl-[60px] rounded-br-[60px] text-black mb-[-60px] relative bg-[#F3ECD2]">
      {/* Grid Container */}
      {/* Default (PC): grid-cols-3, md (Tablet): grid-cols-2, sm (Mobile): grid-cols-1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[40px] lg:gap-[67px] h-full">

        {/* Column 1: Text, Casie, Stephanie */}
        {/* We use a div to contain the column content and apply borders strategically */}
        <div className="border-x-0 lg:border-l-[3px] lg:border-r-[3px] border-[#D2CCB6] md:border-l-[2px]">
          
          {/* Introductory Text Block - Full width in mobile, adjusted for tablet/PC */}
          <div className="pt-[0] lg:pt-[278px] pl-[0] lg:pl-[33px] pr-[0] lg:pr-[122px] mx-auto max-w-[400px] lg:max-w-none">
            <h2 className="cursor-write text-[48px] md:text-[58px] lg:text-[68.9722px] font-heading-bold leading-[52px] md:leading-[62px] lg:leading-[62.075px] text-nowrap">
              Our 2025
            </h2>

            <div className="h-[75.2625px] w-auto relative inline-block">
              <h2 className="relative z-20 text-[45px] md:text-[55px] lg:text-[65.5326px] shadow-[0px_6px_0px_0px] shadow-[rgba(0,0,0,0.2)] leading-[68.9722px] font-heading-bold text-white bg-[#F3A20F] px-[16px] pt-[6px] border-[1.6] border-black rounded-sm rotate-[-1deg] inline-block">
                Speaker
              </h2>
            </div>
            <div>
              <h2 className="w-auto ml-2 rotate-[2deg] text-[45px] md:text-[55px] lg:text-[65.5326px] leading-[68.9722px] font-heading-bold text-white bg-[#F97028] border-[1.6] border-black rounded-sm px-[16px] inline-block">
                Lineup
              </h2>
            </div>
            <div className="mt-[31px] cursor-write leading-[22.0711px] text-[16.9778px] w-full max-w-[271.638px] mx-auto lg:mx-0">
              <p className="font-quicksand">
                Yep, we got <span className="font-bold">Vladdy Daddy</span> for the keynote. Plus some absolute
                <span className="font-bold"> legends</span> that will also be sharing the stage. (More speaker
                <span className="font-bold"> announcements</span> to come!)
              </p>
            </div>

            <div className="mt-[33px] mb-[60px] lg:mb-0">
              <button
                className="
                  cursor-pointer
                  flex items-center justify-center mx-auto lg:mx-0
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
          
          {/* Speakers in Column 1 (PC) / Column 1 (Tablet) / Single Column (Mobile) */}
          <div className="max-w-[414.375px] mx-auto md:max-w-none">
            {/* Casie Evans */}
            <SpeakerBlock
              cursorRef={cursor1Ref}
              containerRef={container1Ref}
              imageSrc="/t3.avif"
              altText="Casie Evans"
              category="Animation"
              name="Casie Evans"
              description={<>Our GSAP <span className="font-bold">fairy codemother</span> is here to sprinkle some<span className="font-bold"> tween</span> magic,
                <span className="font-bold"> animation</span> goodness & Webflow's deepest darkest <span className="font-bold"> secrets</span> now she's on the inside.</>}
            />

            {/* Stephanie Bruce (Moved from Col 2 on PC to Col 1 on Tablet) */}
            <div className="hidden md:block lg:hidden">
                <SpeakerBlock
                    cursorRef={cursor3Ref}
                    containerRef={container3Ref}
                    imageSrc="/t4.avif"
                    altText="Stephanie Bruce"
                    category="Design"
                    name="Stephanie Bruce"
                    description={<>Devs want to<span className="font-bold"> work</span> with her, designers want to <span className="font-bold">be</span> her. Steph
                        has hit the ground running with her <span className="font-bold">stunning </span> <br /> web work and
                        will be sharing her expert <span className="font-bold"> freelancer</span> growth <span className="font-bold">tips.</span></>}
                />
            </div>

            {/* Stephanie Bruce (Original position for PC and Mobile) */}
            <div className="md:hidden lg:block">
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
                            <div className="relative w-full h-full">
                                <Image
                                  src="/t4.avif"
                                  alt="Stephanie Bruce"
                                  fill
                                  className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                            <p className="font-quicksand">
                              Devs want to<span className="font-bold"> work</span> with her, designers want to <span className="font-bold">be</span> her. Steph
                              has hit the ground running with her <span className="font-bold">stunning </span> <br /> web work and
                              will be sharing her expert <span className="font-bold"> freelancer</span> growth <span className="font-bold">tips.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Column 2: Vlad, Ilja, Ross (for Tablet) / Vlad (for PC) */}
        <div className="pt-[0] md:pt-[169px] lg:pt-[169px] border-x-0 md:border-l-[2px] md:border-r-[2px] border-[#D2CCB6]">
          <div className="max-w-[414.375px] mx-auto md:max-w-none">
            {/* Vlad Magdalin (Keynote) */}
            <div className="mt-[60px] md:mt-0 lg:mt-0">
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
                    >
                      <path
                        d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                        fill="#F17100"
                        stroke="#121212"
                        strokeWidth="2"
                      ></path>
                    </svg>
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
                    <div className="relative w-full h-full">
                      <Image
                        src="/t1.avif"
                        alt="Vlad Magdalin"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mx-auto text-[18.0389px] leading-[22.0711px] h-[139.375px] bg-white border-l-[1.6px] border-b-[1.6px] border-r-[1.6px] py-[21.2222px] px-[16.9778px] text-center">
                    <p className="font-quicksand">
                      Our founding <span className="font-bold">Webflow</span> father. Our <br /> <span className="font-bold">dad joke</span> aficionado. He puts
                      the mad into Magdalin and will be kicking off FlowFest '25 as
                      our<span className="font-bold"> keynote</span> speaker!
                    </p>
                  </div>
                </div>
            </div>

            {/* Ilja van Eck (Moved from Col 3 on PC to Col 2 on Tablet) */}
            <div className="md:block lg:hidden">
                <SpeakerBlock
                    cursorRef={cursor4Ref}
                    containerRef={container4Ref}
                    imageSrc="/t2.avif"
                    altText="Ilja van Eck"
                    category="Development"
                    name="Ilja van Eck"
                    description={<>Oh <span className="font-bold">'Eck</span>, we've only gone and secured the web <span className="font-bold">wizard</span> himself.
                        Co-founder <br /> of <span className="font-bold">Osmo </span>& Webflow superstar, <br /> we can't wait to learn
                        from<span className="font-bold"> Ilja!</span></>}
                />
            </div>

            {/* Ross Plaskow (Moved from Col 3 on PC to Col 2 on Tablet) */}
            <div className="md:block lg:hidden">
                <SpeakerBlock
                    cursorRef={cursor5Ref}
                    containerRef={container5Ref}
                    imageSrc="/t5.avif"
                    altText="Ross Plaskow"
                    category="Animation"
                    name="Ross Plaskow"
                    description={<>We've all wanted to <span className="font-bold">animate</span> something cool with <span className="font-bold">Rive</span>, and <br />
                        Ross is here to <span className="font-bold">show</span> us how with <br />his ridiculously<span className="font-bold"> fun</span> and
                        <span className="font-bold"> slick</span> style.</>}
                />
            </div>
          </div>
        </div>

        {/* Column 3: Ilja, Ross (for PC) / (Empty for Tablet) */}
        {/* Hidden on tablet, visible on PC */}
        <div className="hidden lg:block border-x-0 lg:border-l-[3px] lg:border-r-[3px] border-[#D2CCB6]">
          <div className="mt-[341px] max-w-[414.375px] mx-auto">
            {/* Ilja van Eck */}
            <SpeakerBlock
              cursorRef={cursor4Ref}
              containerRef={container4Ref}
              imageSrc="/t2.avif"
              altText="Ilja van Eck"
              category="Development"
              name="Ilja van Eck"
              description={<>Oh <span className="font-bold">'Eck</span>, we've only gone and secured the web <span className="font-bold">wizard</span> himself.
                Co-founder <br /> of <span className="font-bold">Osmo </span>& Webflow superstar, <br /> we can't wait to learn
                from<span className="font-bold"> Ilja!</span></>}
            />

            {/* Ross Plaskow */}
            <SpeakerBlock
              cursorRef={cursor5Ref}
              containerRef={container5Ref}
              imageSrc="/t5.avif"
              altText="Ross Plaskow"
              category="Animation"
              name="Ross Plaskow"
              description={<>We've all wanted to <span className="font-bold">animate</span> something cool with <span className="font-bold">Rive</span>, and <br />
                Ross is here to <span className="font-bold">show</span> us how with <br />his ridiculously<span className="font-bold"> fun</span> and
                <span className="font-bold"> slick</span> style.</>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;