/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Testimonial() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!container || !pinWrapper || cardsRef.current.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Set initial positions - all cards start at bottom except first
    cardsRef.current.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, { y: 0, opacity: 1 });
      } else {
        gsap.set(card, { y: window.innerHeight, opacity: 0 });
      }
    });

    // Create a timeline for all card animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinWrapper,
        start: "top top",
        end: "+=400%", // 400% of viewport height for smooth scrolling
        scrub: 1,
        pin: true, // Pin the entire section while scrolling
        anticipatePin: 1,
        // markers: true, // Uncomment for debugging
      },
    });

    // Add each card animation to the timeline
    cardsRef.current.forEach((card, index) => {
      if (index === 0) return; // Skip first card

      tl.to(
        card,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        index * 0.8 // Stagger the animations
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="px-[13px] md:px-[44.2px] lg:px-[45px] xl:px-[67px] mt-[98.46px] lg:mt-[165px] md:mt-[185.338px] text-black">
      {/* Pinned section */}
      <div ref={pinWrapperRef} className="h-screen flex items-center justify-center">
        <div className="relative lg:px-[72px] xl:px-[101px] 2xl:px-[109px] w-full">
          <div  
            ref={(el) => {cardsRef.current[0] = el}}
            className="absolute z-[1000] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
          >
            <img
              src="/twitter/1.jpg"
              alt=""
              className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-4 md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
            />
          </div>

          <div
            ref={(el) => {cardsRef.current[1] = el}}
            className="absolute z-[1001] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
          >
            <img
              src="/twitter/2.jpg"
              alt=""
              className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-2 md:left-[146px] lg:left-[180px] xl:left-[265px] top-[96px] md:top-[-55px] absolute"
            />
          </div>

          <div
            ref={(el) => {cardsRef.current[2] = el}}
            className="absolute z-[1002] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
          >
            <img
              src="/twitter/3.jpg"
              alt=""
              className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
            />
          </div>

          <div
            ref={(el) => {cardsRef.current[3] = el}}
            className="absolute z-[1003] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
          >
            <img
              src="/twitter/4.jpg"
              alt=""
              className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-[-2deg] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
            />
          </div>

          <div
            ref={(el) => {cardsRef.current[4] = el}}
            className="absolute z-[1004] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
          >
            <img
              src="/twitter/5.jpg"
              alt=""
              className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-[-4deg] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
            />
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start font-heading-xbold text-[55.7949px] md:text-[110.504px] lg:text-[125.156px] xl:text-[176px] 2xl:text-[186.756px] leading-[50.2154px] md:leading-normal text-center md:text-left">
            Flowfest

            <div className="flex items-center justify-center w-[127.213px] md:w-auto text-white text-[53.0051px] md:text-[104.978px] md:ml-4 lg:text-[118.898px] xl:text-[167.2px] 2xl:text-[177.418px] h-[51.95px] md:h-[102.912px] lg:h-[114.537px] xl:h-[162.025px] 2xl:h-[171.725px] md:px-[18.3712px] lg:px-[31.0481px] bg-[#F3A20F] rotate-[-1deg] rounded-lg border-[1.6px] border-black shadow-[rgb(0,0,0,0.15)] shadow-[0px_10px_0px_0px_#000]">
              Love
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;