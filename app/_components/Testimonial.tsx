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
  const touchStartRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cardsRef.current.length === 0) return;

    // Set initial state for cards 1-4
    cardsRef.current.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { y: window.innerHeight, opacity: 0 });
      }
    });

    const animateCard = (isScrollingDown) => {
      const state = animationStateRef.current;

      if (!state.isLocked) return false;
      if (state.isAnimating) return false;

      // Scrolling DOWN - cards come in
      if (isScrollingDown) {
        if (state.currentIndex >= cardsRef.current.length) {
          // All cards are stacked, allow scrolling down to leave
          document.body.style.overflow = "auto";
          state.isLocked = false;
          return false;
        }

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
        return true;
      }
      // Scrolling UP - cards go away
      else {
        if (state.currentIndex <= 1) {
          // All cards are hidden, allow normal scrolling up to leave component
          document.body.style.overflow = "auto";
          state.isLocked = false;
          return false;
        }

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
        return true;
      }
    };

    const handleWheel = (e) => {
      const isScrollingDown = e.deltaY > 0;
      const handled = animateCard(isScrollingDown);
      if (handled) {
        e.preventDefault();
      }
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const state = animationStateRef.current;
      
      if (!state.isLocked) return;
      if (state.isAnimating) return;

      const touchEnd = e.touches[0].clientY;
      const diff = touchStartRef.current - touchEnd;

      // Minimum swipe distance to trigger (50px)
      if (Math.abs(diff) > 50) {
        const isScrollingDown = diff > 0;
        const handled = animateCard(isScrollingDown);
        
        if (handled) {
          e.preventDefault();
          touchStartRef.current = touchEnd; // Reset for next swipe
        }
      }
    };

    let lastScrollY = window.scrollY;

    const handleScrollTrigger = () => {
      const state = animationStateRef.current;
      const currentScrollY = window.scrollY;
      
      state.isAnimating = false;
      state.isLocked = true;
      document.body.style.overflow = "hidden";
      
      lastScrollY = currentScrollY;
    };

    // Single trigger that locks whenever we're in the component
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "center - [150px]",
      onEnter: handleScrollTrigger,
      onEnterBack: handleScrollTrigger,
    });

    // Add both wheel (desktop) and touch (mobile) event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className=" px-[13px] md:px-[44.2px] lg:px-[45px] xl:px-[67px] mt-[98.46px] lg:mt-[165px] md:mt-[185.338px] text-black h-[80vh] ">
      <div className="relative lg:px-[72px] xl:px-[101px] 2xl:px-[109px]">
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
          className="absolute z-[1000] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
        >
          <img
            src="/twitter/2.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-2 md:left-[146px] lg:left-[180px] xl:left-[265px] top-[96px] md:top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[2] = el}}
          className="absolute z-[1000] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
        >
          <img
            src="/twitter/3.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[3] = el}}
          className="absolute z-[1000] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
        >
          <img
            src="/twitter/4.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-[-2deg] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
          />
        </div>

        <div
          ref={(el) => {cardsRef.current[4] = el}}
          className="absolute z-[1000] w-[293.75px] md:w-[412.538px] lg:w-[432.35px] xl:w-[604.8px] 2xl:w-[641.95px] h-[175.35px] md:h-[245.725px] lg:h-[256.812px] xl:h-[358.337px] 2xl:h-[380.35px]"
        >
          <img
            src="/twitter/5.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[39.3846px] md:rounded-[60px] border-[1.6px] rotate-[-4deg] md:left-[146px] lg:left-[180px] xl:left-[265px] shadow-[0px_8px_0px_0px] shadow-[rgba(0,0,0,0.2)] top-[96px] md:top-[-55px] absolute"
          />
        </div>
<div className="sticky top-20 flex flex-col items-center md:flex-row md:items-center md:justify-start font-heading-xbold text-[55.7949px] md:text-[110.504px] lg:text-[125.156px] xl:text-[176px] 2xl:text-[186.756px] leading-[50.2154px] md:leading-normal text-center md:text-left">
  Flowfest

  <div className="flex items-center justify-center w-[127.213px] md:w-auto text-white text-[53.0051px] md:text-[104.978px] md:ml-4 lg:text-[118.898px] xl:text-[167.2px] 2xl:text-[177.418px] h-[51.95px] md:h-[102.912px] lg:h-[114.537px] xl:h-[162.025px] 2xl:h-[171.725px] md:px-[18.3712px] lg:px-[31.0481px] bg-[#F3A20F] rotate-[-1deg] rounded-lg border-[1.6px] border-black shadow-[rgb(0,0,0,0.15)] shadow-[0px_10px_0px_0px_#000]">
    Love
  </div>
</div>

      </div>
    </div>
  );
}

export default Testimonial;