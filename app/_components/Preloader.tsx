/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/static-components */
'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Shared Parameters for Twin (Side) Strokes ---
const sideBaseLengths = [809.204, 730.653, 652.102, 573.551];
const sidePaths = [
  { d: "M26 0V400C26 510.457 115.543 600 226 600H321", color: "#F489A3" },
  { d: "M76 0V400C76 482.843 143.157 550 226 550H321", color: "#F0BB0D" },
  { d: "M126 0V400C126 455.228 170.772 500 226 500H321", color: "#F3A20F" },
  { d: "M176 0V400C176 427.614 198.386 450 226 450H321", color: "#F97028" },
];


// ==========================================================
// 1. Reusable Side Strokes SVG Component
// ==========================================================

/**
 * A reusable component for rendering the side stroke SVGs.
 * The `calculateStyles` prop determines the animation logic (time-based for preloader, scroll-based for hero).
 */
const SideStrokesSVG = ({ sideClass, isLeft, calculateStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 321 626"
    fill="none"
    className={sideClass}
    // Left stroke requires mirroring and specific bottom-left offset
    style={isLeft ? { bottom: '-10em', left: '-4.75em', transform: 'scale(-1)' } : {}}
  >
    {sidePaths.map((path, index) => {
      const baseLength = sideBaseLengths[index];
      const styles = calculateStyles(baseLength, index, isLeft);

      return (
        <React.Fragment key={index}>
          {/* Background (thicker) stroke */}
          <path d={path.d} stroke="#121212" strokeWidth="52" style={styles} />
          {/* Color (thinner) stroke */}
          <path d={path.d} stroke={path.color} strokeWidth="48" style={styles} />
        </React.Fragment>
      );
    })}
  </svg>
);


// ==========================================================
// 2. Preloader Logic (Time-Based Animation)
// ==========================================================

const STRIP_COUNT = sideBaseLengths.length;
const TOTAL_ANIMATION_DURATION = 1000; // Total time in milliseconds for a single strip to draw in
const STAGGER_DELAY_PER_STRIP = 100; // Milliseconds delay between the start of each strip's animation
const PRELOADER_START_DELAY = 1000; // 1 second delay before the animation timeline begins

const calculatePreloaderStyles = (baseLength, index, isLeft, animationProgress) => {
  // Determine the scroll/time point where this strip should start (stagger)
  const startDelayRatio = (index * STAGGER_DELAY_PER_STRIP) / TOTAL_ANIMATION_DURATION;

  // The effective time progress for this individual strip (normalized to 0 to 1)
  // This logic is complex but attempts to map total progress to a strip-specific progress:
  // (Progress - Delay) / (Max Progress - Delay) -> simplified:
  const stripProgress = Math.min(
    1,
    Math.max(0, (animationProgress - (startDelayRatio * animationProgress)) / (1 - startDelayRatio))
  );

  // Apply the Cubic Ease-In for slow start and fast end
  const easedProgress = Math.pow(stripProgress, 3);

  // DRAW IN LOGIC: currentLength GROWS from 0 to baseLength
  const currentLength = easedProgress * baseLength;

  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;

  // Offset logic for preloader's left side (Draw In from right)
  const offset = isLeft ? -(baseLength - currentLength) : 0;

  return {
    strokeDasharray: dashArray,
    strokeDashoffset: `${offset.toFixed(3)}`,
  };
};

const PreloaderSideStrokes = ({ onComplete }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsedSinceStart = timestamp - startTimeRef.current;
    const effectiveElapsed = Math.max(0, elapsedSinceStart - PRELOADER_START_DELAY);
    const totalTimelineDuration = TOTAL_ANIMATION_DURATION + (STRIP_COUNT - 1) * STAGGER_DELAY_PER_STRIP;
    
    let progress = Math.min(1, effectiveElapsed / totalTimelineDuration);

    setAnimationProgress(progress);

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Small delay to ensure completion frame is seen before unmount/hiding
      setTimeout(onComplete, 50);
    }
  }, [onComplete]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // Pass animationProgress to a specialized style calculator
  const getPreloaderStyles = useCallback((baseLength, index, isLeft) => 
    calculatePreloaderStyles(baseLength, index, isLeft, animationProgress), 
    [animationProgress]
  );

  return (
    <div className="preloader-container">
      <style>{`
        /* Styles for preloader overlay */
        .preloader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background: #f3ecd2;
          /* Hide scrollbar during preloading */
          overflow: hidden; 
        }
        body {
          overflow: hidden; /* Ensure body overflow is hidden during preloader stage */
          height: 100vh;
        }
        .rainbow-sides__right {
          width: 20.0625em;
          position: fixed;
          top: 0;
          right: -4.75em; 
        }
        .rainbow-sides__left {
          width: 20.0625em;
          position: fixed;
        }
      `}</style>
      
      <SideStrokesSVG sideClass="rainbow-sides__right" isLeft={false} calculateStyles={getPreloaderStyles} />
      <SideStrokesSVG sideClass="rainbow-sides__left" isLeft={true} calculateStyles={getPreloaderStyles} />
    </div>
  );
};


// ==========================================================
// 3. Main Hero Logic (Scroll-Based Animation)
// ==========================================================

// --- Parameters for Vertical (Center) Strokes ---
const sideTriggerOffset = 154; // From original file
const centerBaseLength = 600;
const CENTER_STRIP_COUNT = 9;
// The total scroll distance allocated for the center animation (must be large enough)
const CENTER_ANIMATION_LENGTH = 1200; 

const centerPathData = [
  { d: "M426 0V600", color: "#F97028" }, // 0 (Rightmost)
  { d: "M376 0V600", color: "#F489A3" }, // 1
  { d: "M326 0V600", color: "#F0BB0D" },
  { d: "M276 0V600", color: "#F3A20F" },
  { d: "M226 0V600", color: "#F97028" },
  { d: "M176 0V600", color: "#F489A3" },
  { d: "M126 0V600", color: "#F0BB0D" },
  { d: "M76 0V600", color: "#F3A20F" },
  { d: "M26 0V600", color: "#F97028" }, // 8 (Leftmost)
];


const calculateSidePathStyles = (baseLength, index, isLeft, scrollPercent) => {
  const totalAnimationDistance = sideBaseLengths[0] + (sideTriggerOffset * 3);
  const totalScroll = scrollPercent * totalAnimationDistance;
  const startPoint = index * sideTriggerOffset;
  const stripScroll = Math.max(0, totalScroll - startPoint);
  
  // Fade Out Logic: length shrinks
  const currentLength = Math.max(0, baseLength - stripScroll);
  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;
  
  // Offset logic for hero's left side (Fade Out from left)
  const offset = isLeft ? -(baseLength - currentLength) : 0;
  
  return {
    strokeDasharray: dashArray,
    strokeDashoffset: `${offset.toFixed(3)}`,
  };
};

const calculateCenterPathStyles = (baseLength, index, scrollPercent) => {
  const totalScroll = scrollPercent * CENTER_ANIMATION_LENGTH;

  // --- NON-LINEAR STAGGERING (Ease-Out) ---
  const t = index / (CENTER_STRIP_COUNT - 1);
  // Ease-out quadratic function: moves start points closer together at the end.
  const easedProgress = 1 - (1 - t) * (1 - t); 
  
  const TOTAL_DELAY_DISTANCE = CENTER_ANIMATION_LENGTH - baseLength;
  const staggerDelay = easedProgress * TOTAL_DELAY_DISTANCE;

  const startPoint = staggerDelay; 
  const stripScroll = Math.max(0, totalScroll - startPoint);

  // DRAW IN LOGIC: currentLength GROWS from 0 to baseLength
  const currentLength = Math.min(baseLength, stripScroll);

  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;
  
  // OFFSET for top-down drawing: Set to 0.
  const offset = 0; 

  return {
    strokeDasharray: dashArray,
    strokeDashoffset: `${offset.toFixed(3)}`,
  };
};

const SvgVerticalStrokes = ({ scrollPercent }) => {
  const getCenterStyles = useCallback((baseLength, index) => 
    calculateCenterPathStyles(baseLength, index, scrollPercent), 
    [scrollPercent]
  );
  
  return (
    <div className="rainbow-vertical__1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 452 600"
        fill="none"
        preserveAspectRatio="none"
        className="ranbow-vertical__1-svg"
      >
        {centerPathData.map((path, index) => {
          const baseLength = centerBaseLength;
          const styles = getCenterStyles(baseLength, index);

          return (
            <React.Fragment key={index}>
              <path d={path.d} stroke="#121212" strokeWidth="52" style={styles} />
              <path d={path.d} stroke={path.color} strokeWidth="48" style={styles} />
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
};


const HeroTwinStrokes = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined' && document.documentElement.scrollHeight > window.innerHeight) {
      // Calculate scroll progress from 0 to 1
      const newScrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPercent(newScrollPercent);
    }
  }, []);

  useEffect(() => {
    // Re-enable scroll on body when hero component mounts
    document.body.style.overflow = 'auto'; 
    document.body.style.height = 'auto';

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Pass scrollPercent to a specialized style calculator
  const getHeroSideStyles = useCallback((baseLength, index, isLeft) => 
    calculateSidePathStyles(baseLength, index, isLeft, scrollPercent), 
    [scrollPercent]
  );

  return (
    <>
      <style>{`
        /* Global styles for the Hero page */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: #f3ecd2;
          overflow-x: hidden;
        }

        .rainbow-sides__right {
          width: 20.0625em;
          position: fixed;
          top: 0;
          right: -4.75em;
          z-index: 10; 
        }
        
        .rainbow-sides__left {
          width: 20.0625em;
          position: fixed;
          z-index: 10; 
        }

        .ranbow-vertical__1-svg {
          width: 28.25em;
          height: 100%;
        }

        .rainbow-vertical__1 {
            position: fixed; 
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 100vh; 
            z-index: 5; 
            overflow: visible;
        }
      `}</style>
      
      <div className="scroll-container" style={{ height: '400vh', position: 'relative' }}>
        
        {/* Central Vertical Strokes: Draw In (Top-Down, Ease-Out Stagger) */}
        <SvgVerticalStrokes scrollPercent={scrollPercent} />

        {/* Right Side Strokes: Fade Out (Uses the reusable SVG component) */}
        <SideStrokesSVG 
          sideClass="rainbow-sides__right" 
          isLeft={false} 
          calculateStyles={getHeroSideStyles} 
        />
        
        {/* Left Side Strokes: Fade Out (Uses the reusable SVG component) */}
        <SideStrokesSVG 
          sideClass="rainbow-sides__left" 
          isLeft={true} 
          calculateStyles={getHeroSideStyles} 
        />
      </div>
    </>
  );
};


// ==========================================================
// 4. App Component (Synchronization)
// ==========================================================

const App = () => {
    // State to control which component is visible
    const [isPreloading, setIsPreloading] = useState(true);

    // Callback to be run by the Preloader component when its animation finishes
    const handlePreloaderComplete = useCallback(() => {
        setIsPreloading(false);
    }, []);

    // NOTE: The body overflow style management has been moved into the 
    // respective components' mounting effects to ensure correct state.

    return (
        // The App component conditionally renders the Preloader or the Hero.
        // The Preloader hides itself and calls handlePreloaderComplete on finish.
        <>
            {isPreloading && <PreloaderSideStrokes onComplete={handlePreloaderComplete} />}
            {!isPreloading && <HeroTwinStrokes />}
        </>
    );
};

export default App;