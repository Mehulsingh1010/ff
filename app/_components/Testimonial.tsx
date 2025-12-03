/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Testimonial() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const animationStateRef = useRef({
    isLocked: false,
    currentIndex: 1,
    isAnimating: false,
    scrollDirection: "down",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cardsRef.current.length === 0) return;

    // Set initial state for cards 1-4
    cardsRef.current.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { y: window.innerHeight, opacity: 0 });
      }
    });

    const handleWheel = (e) => {
      const state = animationStateRef.current;

      if (!state.isLocked) return;
      if (state.isAnimating) return;

      const isScrollingDown = e.deltaY > 0;

      // Scrolling DOWN - cards come in
      if (isScrollingDown) {
        if (state.currentIndex >= cardsRef.current.length) {
          // All cards are stacked, allow scrolling down to leave
          document.body.style.overflow = "auto";
          state.isLocked = false;
          return;
        }

        e.preventDefault();
        state.isAnimating = true;

        gsap.to(cardsRef.current[state.currentIndex], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            state.currentIndex += 1;
            state.isAnimating = false;
          },
        });
      }
      // Scrolling UP - cards go away
      else {
        if (state.currentIndex <= 1) {
          // All cards are hidden, allow normal scrolling up to leave component
          document.body.style.overflow = "auto";
          state.isLocked = false;
          return;
        }

        e.preventDefault();
        state.isAnimating = true;
        state.currentIndex -= 1;

        gsap.to(cardsRef.current[state.currentIndex], {
          y: window.innerHeight,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            state.isAnimating = false;
            // Check again after animation if we should unlock
            if (state.currentIndex <= 1) {
              document.body.style.overflow = "auto";
              state.isLocked = false;
            }
          },
        });
      }
    };

    let lastScrollY = window.scrollY;

    const handleScrollTrigger = () => {
      const state = animationStateRef.current;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      
      state.isAnimating = false;
      state.isLocked = true;
      document.body.style.overflow = "hidden";
      
      lastScrollY = currentScrollY;
    };

    // Single trigger that locks whenever we're in the component
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: " center - [150px]",
      onEnter: handleScrollTrigger,
      onEnterBack: handleScrollTrigger,
    });

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="px-[67px] mt-[255px] text-black h-[100vh]">
      <div className="relative px-[109px]">
        <div
          ref={(el) => {cardsRef.current[0] = el}}
          className="absolute z-[1000] w-[641.95px] h-[380.35px]"
        >
          <img
            src="/twitter/1.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[60px] border-[1.6px] rotate-4 left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[1] = el}}
          className="absolute z-[1000] w-[641.95px] h-[380.35px]"
        >
          <img
            src="/twitter/2.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[60px] border-[1.6px] rotate-2 left-[265px] top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[2] = el}}
          className="absolute z-[1000] w-[641.95px] h-[380.35px]"
        >
          <img
            src="/twitter/3.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[60px] border-[1.6px] left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[3] = el}}
          className="absolute z-[1000] w-[641.95px] h-[380.35px]"
        >
          <img
            src="/twitter/4.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[60px] border-[1.6px] rotate-[-2deg] left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[4] = el}}
          className="absolute z-[1000] w-[641.95px] h-[380.35px]"
        >
          <img
            src="/twitter/5.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[60px] border-[1.6px] rotate-[-4deg] left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[-55px] absolute"
          />
        </div>

        <div className="sticky top-20 flex items-center justify-start font-heading-xbold text-[186.756px] overflow-hidden">
          Flowfest
          <div className="text-white text-[177.418px] ml-[42px] h-[171.725px] px-[31.0481px] bg-[#F3A20F] rotate-[-1deg] rounded-lg shadow-[#CFC9B3] shadow-[0px_10px_0px_0px_#000] border-[1.6px] border-black">
            <p className="mt-[-40px]">Love</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;