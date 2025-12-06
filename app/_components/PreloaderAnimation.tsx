/* eslint-disable prefer-const */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import {
  TOTAL_ANIMATION_DURATION,
  STAGGER_DELAY_PER_STRIP,
  PRELOADER_START_DELAY,
  STRIP_COUNT,
  messages,
} from '../constants/stripeConstants';
import { calculatePreloaderStyles } from '../utils/stripeCalculations';
import SideStrokesSVG from './SideStrokesSVG';
import FloatingSunMinimal from './SunHome';
import OrangeBox from './OrangeBox';

const PreloaderAnimation = ({ onComplete, navbarRef, homeContentRef, sunDateRef }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagePhase, setMessagePhase] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [preloaderBgVisible, setPreloaderBgVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsedSinceStart = timestamp - startTimeRef.current;
    const effectiveElapsed = Math.max(0, elapsedSinceStart - PRELOADER_START_DELAY);
    const totalTimelineDuration =
      TOTAL_ANIMATION_DURATION + (STRIP_COUNT - 1) * STAGGER_DELAY_PER_STRIP;

    let progress = Math.min(1, effectiveElapsed / totalTimelineDuration);

    setAnimationProgress(progress);

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, []);

  const getResponsiveTop = () => {
  if (window.innerWidth < 768) return "106px";
  if (window.innerWidth < 1024) return "190px";
  return "224px";
};

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // Start stripe animation
    animationFrameRef.current = requestAnimationFrame(animate);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          // Unlock scroll
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
          document.body.style.position = "static";
          if (onComplete) onComplete();
        }, 100);
      },
    });

    timelineRef.current = tl;

    const typeText = (text, duration = 0.03) => {
      return {
        onStart: () => {
          setCurrentMessage("");
          setShowCursor(true);
        },
        onUpdate: function () {
          const progress = this.progress();
          const length = Math.floor(progress * text.length);
          setCurrentMessage(text.slice(0, length));
        },
        duration: text.length * duration,
      };
    };

    const eraseText = (text, duration = 0.02) => {
      return {
        onUpdate: function () {
          const progress = 1 - this.progress();
          const length = Math.floor(progress * text.length);
          setCurrentMessage(text.slice(0, length));
        },
        duration: text.length * duration,
      };
    };

    // Animation timeline
    tl.to({}, { duration: 0.3 })
      // Type "..."
      .to({}, typeText(messages[0], 0.1))
      .to({}, { duration: 0.5 })
      .to({}, eraseText(messages[0]))
      .to({}, { duration: 0.2 })
      // Type "hi friends"
      .call(() => setMessagePhase(1))
      .to({}, typeText(messages[1]))
      .to({}, { duration: 0.6 })
      .to({}, eraseText(messages[1]))
      .to({}, { duration: 0.2 })
      // Type "we are back"
      .call(() => setMessagePhase(2))
      .to({}, typeText(messages[2]))
      .to({}, { duration: 0.7 })
      .call(() => setPreloaderBgVisible(false))
      .to(
  containerRef.current,
  { top: getResponsiveTop(), duration: 1.2, ease: "power2.inOut" },
  "slideIn"
)
     
      .to(
        navbarRef.current,
        { y: 0, duration: 1.2, ease: "power2.inOut" },
        "slideIn"
      )
      // Slide home content up from bottom
      .to(
        homeContentRef.current,
        { y: 0, duration: 1.2, ease: "power2.inOut" },
        "slideIn"
      )
      // Erase "we are back"
      .to({}, eraseText(messages[2]))
      .to({}, { duration: 0.2 })
      // Type final message "Friday 8th August, Manchester, UK"
      .call(() => setMessagePhase(3))
      .to({}, typeText("Friday 8th August, Manchester, UK", 0.025))
      .to({}, { duration: 0.5 })
      // Hide cursor after typing complete
      .call(() => setShowCursor(false))
      // Fade out preloader and fade in permanent version
      .to(
        containerRef.current,
        { opacity: 0, duration: 0.4 },
        "transition"
      )
      .to(
        sunDateRef.current,
        { opacity: 1, duration: 0.4 },
        "transition"
      )
      .to({}, { duration: 0.3 });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [animate, onComplete, navbarRef, homeContentRef, sunDateRef]);

  const getPreloaderStyles = useCallback(
    (baseLength, index, isLeft) =>
      calculatePreloaderStyles(baseLength, index, isLeft, animationProgress),
    [animationProgress]
  );

  return (
    <>
      {/* Preloader background - fades out before slide animations */}
      {preloaderBgVisible && (
        <div className="fixed inset-0 w-screen h-screen z-[60] bg-[#f3ecd2]" />
      )}

      {/* Stripes layer - Hidden on mobile, shown on medium screens and up */}
      <div className="fixed inset-0 w-screen h-screen z-[70] pointer-events-none hidden  md:hidden lg:block">
        <style>{`
          .preloader-rainbow-sides__right {
            position: fixed;
            top: 0;
            right: -4.75em;
            z-index: 1;
            pointer-events: none;
            display: block;
          }
          .preloader-rainbow-sides__left {
            position: fixed;
            bottom: 0;
            left: -4.5em;
            z-index: 1;
            pointer-events: none;
            display: block;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>

        <SideStrokesSVG
          sideClass="preloader-rainbow-sides__right"
          isLeft={false}
          calculateStyles={getPreloaderStyles}
          isPreloader={true}
        />
        <SideStrokesSVG
          sideClass="preloader-rainbow-sides__left"
          isLeft={true}
          calculateStyles={getPreloaderStyles}
          isPreloader={true}
        />
      </div>

      {/* Preloader Message Container */}
      <div
        ref={containerRef}
        className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] flex items-center gap-[6px] md:gap-[10px] lg:gap-[10px]"
        style={{ top: "50vh" }}
      >
        <div className=" md:max-h-[59px] lg:max-h-[64px]">
          <FloatingSunMinimal />
        </div>
        <OrangeBox
          message={currentMessage}
          messagePhase={messagePhase}
          isPreloader={true}
          showCursor={showCursor}
        />
      </div>
    </>
  );
};

export default PreloaderAnimation;