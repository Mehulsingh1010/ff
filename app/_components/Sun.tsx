/* eslint-disable prefer-const */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Ensure TextPlugin is registered
gsap.registerPlugin(TextPlugin);

function SunPage({ svgSrc }) {
  const faceRef = useRef(null);
  const rightEyeRef = useRef(null);
  const winkRef = useRef(null);
  const sunContainerRef = useRef(null);
  const componentRef = useRef(null);
  const textBubbleRef = useRef(null);
  const textRef = useRef(null);
  const extraSvgRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isIntersectingFooter, setIsIntersectingFooter] = useState(false);

  const [isIntersectingHeroOrMain, setIsIntersectingHeroOrMain] =
    useState(true);

  const targetPhrase = "Friday 8th August, Manchester, UK";
  const words = targetPhrase.split(" ");
  const initialWidth = "310";

  // Use refs to track the current running timelines for proper cleanup and interruption
  const typewriterTLRef = useRef(null);
  const reverseTLRef = useRef(null);

  useEffect(() => {
    // Determine visibility based on intersection state
    setIsVisible(!isIntersectingFooter && !isIntersectingHeroOrMain);
  }, [isIntersectingFooter, isIntersectingHeroOrMain]);

  useEffect(() => {
    // Setup Intersection Observers after a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const mainOrHeroElements = document.querySelectorAll(
        'main, [data-main="true"], [data-hero="true"]'
      );
      const footerElements = document.querySelectorAll(
        'footer, [data-footer="true"]'
      );

      let cleanupFns = [];

      const setupObserver = (elements, threshold, setter) => {
        if (elements.length > 0) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              setter(entry.isIntersecting);
            },
            { threshold: threshold }
          );

          elements.forEach((el) => observer.observe(el));

          cleanupFns.push(() => {
            elements.forEach((el) => observer.unobserve(el));
          });
        } else {
          if (elements === mainOrHeroElements) {
            // If no main/hero is found, assume we should be visible by default
            setIsIntersectingHeroOrMain(false);
            console.warn(
              'No <main>, [data-main="true"], or [data-hero="true"] found.'
            );
          }
        }
      };

      setupObserver(mainOrHeroElements, 0.1, setIsIntersectingHeroOrMain);
      setupObserver(footerElements, 0.2, setIsIntersectingFooter);

      return () => {
        cleanupFns.forEach((fn) => fn());
      };
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate component in/out of view based on isVisible state
    const component = componentRef.current;
    if (!component) return;

    if (isVisible) {
      gsap.to(component, {
        x: "0%",
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(component, {
        x: "-400%",
        duration: 0.6,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const face = faceRef.current;
    const rightEye = rightEyeRef.current;
    const winkEye = winkRef.current;
    const sunContainer = sunContainerRef.current;
    const textBubble = textBubbleRef.current;
    const textElement = textRef.current;
    const extraSvg = extraSvgRef.current;

    if (!face || !sunContainer || !isVisible) return;

    // --- Constant Definitions ---
    const verticalPadding = "8.53333px";
    const bubblePadding = {
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding,
      paddingLeft: "12.8px",
      paddingRight: "12.8px",
    };

    const collapsedState = {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
      width: "0px",
      height: "0px",
    };

    const dotsWidth = "40px";
    const fixedHeight = "35.6px";

    // --- Initial Setup ---
    if (face) {
      gsap.set(face, { opacity: 1 });
    }
    if (winkEye) {
      gsap.set(winkEye, { opacity: 0 });
    }
    if (textBubble) {
      gsap.set(textBubble, {
        overflow: "hidden",
        opacity: 0,
        ...collapsedState,
      });
    }
    if (textElement) {
      gsap.set(textElement, { innerHTML: "" });
    }

    // --- Mouse Move Handler (Eye Follow) ---
    const handleMouseMove = (e) => {
      const sunRect = sunContainer.getBoundingClientRect();
      const sunCenterX = sunRect.left + sunRect.width / 2;
      const sunCenterY = sunRect.top + sunRect.height / 2;
     

      const deltaX = e.clientX - sunCenterX;
      const deltaY = e.clientY - sunCenterY;

      const maxMove = 60;
      const divisor = 7;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX / divisor));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY / divisor));

      gsap.to(face, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // --- Mouse Enter Handler (Typewriter) ---
  // --- Mouse Enter Handler (Typewriter) ---
const handleFaceMouseEnter = () => {
    // Fade in the extra SVG (bubble tail) smoothly
    if (extraSvg) {
        gsap.to(extraSvg, { opacity: 1, duration: 0.2 }); 
    }
    
    // Kill any running reverse animation
    if (reverseTLRef.current) {
        reverseTLRef.current.kill();
        reverseTLRef.current = null;
    }
    // Kill any running typewriter animation before starting a new one
    if (typewriterTLRef.current) {
        typewriterTLRef.current.kill();
        typewriterTLRef.current = null;
    }

    gsap.to(rightEye, { opacity: 0, duration: 0 });
    gsap.to(winkEye, { opacity: 1, duration: 0 });

    if (textBubble && textElement) {
        // Reset text and bubble to initial hover state before animating
        gsap.set(textElement, { innerHTML: "" });
        gsap.set(textBubble, {
            ...collapsedState,
            width: dotsWidth,
            height: fixedHeight,
            // Start with opacity 0 (it will be animated to 1 below)
            opacity: 0, 
            ...bubblePadding,
        });

        const typewriterTL = gsap.timeline({
            paused: true,
            onComplete: () => {
                typewriterTLRef.current = null;
            },
        });

        typewriterTLRef.current = typewriterTL;

        typewriterTL
            .to(
                textBubble,
                {
                    // Fades the main bubble opacity to 1
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out",
                    width: dotsWidth, // Initial width for '...'
                    height: fixedHeight,
                    ...bubblePadding,
                },
                0 // Start at the beginning of the timeline
            )
            .to(textElement, { duration: 0.1, text: "..." }, 0.2)
            .to(textElement, { duration: 0.1, text: "..." }, "+=0.5")
            .to(
                textElement,
                {
                    duration: 0.8,
                    text: targetPhrase,
                    ease: "none",
                },
                "<"
            )
            .to(
                textBubble,
                {
                    width: initialWidth + "px",
                    duration: 0.8,
                    ease: "none",
                },
                "<"
            );

        typewriterTL.play();
    }
};
    // --- Mouse Leave Handler (Reverse Typewriter) ---
   // --- Mouse Leave Handler (Reverse Typewriter) ---
// --- Mouse Leave Handler (Reverse Typewriter) ---
const handleFaceMouseLeave = () => {
    // 1. Capture the current state of the elements
    const currentText = textElement ? textElement.innerHTML : "";

    // Kill the forward timeline if it's running
    if (typewriterTLRef.current) {
        typewriterTLRef.current.kill();
        typewriterTLRef.current = null;
    }

    // Kill the reverse timeline if it's running
    if (reverseTLRef.current) {
        reverseTLRef.current.kill();
        reverseTLRef.current = null;
    }

    // 🎯 FADE OUT: Start fading out the entire bubble and SVG tail immediately
    const fadeOutDuration = 0.3; 
    
    if (textBubble) {
        gsap.to(textBubble, { opacity: 0, duration: fadeOutDuration, ease: "power1.in" });
    }
    
    if (extraSvg) {
        gsap.to(extraSvg, { opacity: 0, duration: fadeOutDuration, ease: "power1.in" });
    }

    // Only run reverse animation/size-reset if there is text to hide
    if (textBubble && textElement && currentText.length > 0) {
        // Ensure the text element starts exactly from where it was interrupted
        gsap.set(textElement, { innerHTML: currentText });

        const reverseTL = gsap.timeline({
            onComplete: () => {
                // Final state adjustments: Reset eyes and bubble size (opacity is already 0)
                gsap.to(rightEye, { opacity: 1, duration: 0 });
                gsap.to(winkEye, { opacity: 0, duration: 0 });
                
                // CRITICAL: Set bubble to collapsed size instantly now that opacity is 0
                gsap.set(textBubble, { ...collapsedState });
                
                // Opacity for bubble/svg is handled by the gsap.to above, 
                // but we clear the text content and ref here.
                gsap.set(textElement, { innerHTML: "" });
                reverseTLRef.current = null;
            },
        });

        reverseTLRef.current = reverseTL;

        // Calculate dynamic duration based on how much text needs to be reversed
        // Use a multiplier like 0.3 if you want it faster than the default 0.8
        const charsToReverse = currentText.length - 3; 
        const reverseDuration = Math.max(
            0.1,
            (charsToReverse / targetPhrase.length) * 0.3 // Use 0.3 for a quicker reverse
        );

        // Reverse typewriting runs in the background
        reverseTL.to(textElement, { duration: reverseDuration, text: "...", ease: "none" }, 0);

        // Reverse bubble size from current width to 'dotsWidth'
        reverseTL.to(
            textBubble,
            {
                width: dotsWidth,
                height: fixedHeight,
                duration: reverseDuration,
                ease: "power2.in",
            },
            0
        );
    } else {
        // Handle cases where the mouse leaves before the typewriter started properly
        gsap.to(rightEye, { opacity: 1, duration: 0 });
        gsap.to(winkEye, { opacity: 0, duration: 0 });
        
        // Ensure final collapsed size reset
        gsap.set(textBubble, { opacity: 0, duration: 0, ...collapsedState });
    }
};

    // --- Event Listeners ---
    window.addEventListener("mousemove", handleMouseMove);
    sunContainer.addEventListener("mouseenter", handleFaceMouseEnter);
    sunContainer.addEventListener("mouseleave", handleFaceMouseLeave);

    // --- Cleanup Function ---
    return () => {
      if (typewriterTLRef.current) typewriterTLRef.current.kill();
      if (reverseTLRef.current) reverseTLRef.current.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      sunContainer.removeEventListener("mouseenter", handleFaceMouseEnter);
      sunContainer.removeEventListener("mouseleave", handleFaceMouseLeave);
    };
  }, [isVisible, targetPhrase]); // Added dependencies

  // --- Render ---
  return (
    <div
      ref={componentRef}
      className="fixed bottom-[33px] left-[33px] z-40 flex items-center"
      style={{
        transform: "translateX(-400%)",
      }}
    >
      {/* Sun SVG Container */}
      <div
        ref={sunContainerRef}
        className="h-[45.9375px] w-[45.9375px] md:w-[58.925px] md:h-[58.925px] lg:w-[45.5px] lg:h-[45.5px] xl:h-[64px] xl:w-[64px] 2xl:w-[67.9px] 2xl:h-[67.9px] cursor-pointer pointer-events-auto relative flex-shrink-0 mr-[12.8px]"
      >
        {/* Rotating Sun Image (Always Visible) */}
        <div className="animate-[spin_20s_linear_infinite] w-full h-full">
          {svgSrc && <img src={svgSrc} alt="sun" className="w-full h-full" />}
        </div>

        {/* Smiley Face (Always Visible) */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 420 420"
        >
          {/* FACE GROUP: Always Visible */}
          <g ref={faceRef}>
            {/* Teeth Smile (hidden) */}
            <g ref={null} opacity="0" transform="translate(190 200) scale(2.5)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                style={{ overflow: "visible" }}
              >
                <path
                  d="M11.8921 18C5.9557 19.2392 4.66149 14.9968 3.5863 11.9479C3.37455 11.3475 3.80655 10.6869 4.44285 10.6652C9.15161 10.5051 11.2843 10.3509 14.8793 8.66061C15.4922 8.37244 16.2307 8.80754 16.2719 9.48354C16.4616 12.6034 16.766 16.6483 11.8921 18Z"
                  fill="var(--color-light, white)"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M4.5 14C9.24535 14.5931 13.9652 13.5983 16 12"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              </svg>
            </g>

            {/* Eyes and Wink */}
            <circle ref={null} cx="170" cy="180" r="11" fill="#121212" />
            <circle ref={rightEyeRef} cx="230" cy="180" r="11" fill="#121212" />

            <g
              ref={winkRef}
              opacity="0"
              transform="translate(195 178) scale(3.5)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                style={{ overflow: "visible" }}
              >
                <path
                  d="M10.5 2L14.5 1.49999"
                  stroke="#121212"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </g>

            {/* Normal Smile */}
            <path
              ref={null}
              d="M160 240 Q200 270 240 240"
              stroke="#121212"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <svg
          ref={extraSvgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          viewBox="0 0 22 13"
          fill="none"
          className="absolute "
          style={{ left: "74px", bottom: "15.5px", zIndex: 10,opacity: 0 }}
        >
          <path
            d="M13.2965 8.70441C15.5695 10.5858 18.4864 11.7165 21.6675 11.7165L21.67 1H8.70396C8.87681 7.22251 4.20993 10.3338 3 10.8523C7.39294 11.651 11.029 10.2151 13.2965 8.70441Z"
            fill="#FF6B35"
          />
          <path
            d="M21.6675 11.7165C18.4864 11.7165 15.5695 10.5858 13.2965 8.70441C11.029 10.2151 7.39294 11.651 3 10.8523C4.20993 10.3338 8.87681 7.22251 8.70396 1"
            stroke="#121212"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* SPEECH BUBBLE */}
      <div></div>
      <div
        ref={textBubbleRef}
        className="bg-[#F97028] flex items-center rounded-[14.86px] text-white relative whitespace-nowrap border-[1.6px] border-[#121212]"
        style={{
          wordSpacing: "-0.424444px",
          fontSize: "16.9778px",
          lineHeight: "22.0711px",
          fontWeight: "500",
          maxWidth: "310.025px",

          pointerEvents: "none",
        }}
      >
        <div
          className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 w-0 h-0"
          style={{
            borderTop: "9.5px solid transparent",
            borderBottom: "9.5px solid transparent",
            borderRight: "15px solid #121212",
          }}
        />
        <div
          className="absolute left-[-13.5px] top-1/2 transform -translate-y-1/2 w-0 h-0 z-10"
          style={{
            borderTop: "7.5px solid transparent",
            borderBottom: "7.5px solid transparent",
            borderRight: "13.5px solid #F97028",
          }}
        />

        <p ref={textRef}>{/* Text content controlled by GSAP */}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          viewBox="0 0 22 13"
          fill="none"
          className="absolute transition-all duration-700 ease-out"
          style={{ left: "-8px", bottom: "-0.5px" }}
        >
          <path
            d="M13.2965 8.70441C15.5695 10.5858 18.4864 11.7165 21.6675 11.7165L21.67 1H8.70396C8.87681 7.22251 4.20993 10.3338 3 10.8523C7.39294 11.651 11.029 10.2151 13.2965 8.70441Z"
            fill="#FF6B35"
          />
          <path
            d="M21.6675 11.7165C18.4864 11.7165 15.5695 10.5858 13.2965 8.70441C11.029 10.2151 7.39294 11.651 3 10.8523C4.20993 10.3338 8.87681 7.22251 8.70396 1"
            stroke="#121212"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default SunPage;
