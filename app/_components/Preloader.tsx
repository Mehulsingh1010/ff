'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';

const sideBaseLengths = [809.204, 730.653, 652.102, 573.551];
const sidePaths = [
  { d: "M26 0V400C26 510.457 115.543 600 226 600H321", color: "#F489A3" },
  { d: "M76 0V400C76 482.843 143.157 550 226 550H321", color: "#F0BB0D" },
  { d: "M126 0V400C126 455.228 170.772 500 226 500H321", color: "#F3A20F" },
  { d: "M176 0V400C176 427.614 198.386 450 226 450H321", color: "#F97028" },
];

const SideStrokesSVG = ({ sideClass, isLeft, calculateStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 321 626"
    fill="none"
    className={sideClass}
    style={isLeft ? { bottom: '-10em', left: '-4.75em', transform: 'scale(-1)' } : {}}
  >
    {sidePaths.map((path, index) => {
      const baseLength = sideBaseLengths[index];
      const styles = calculateStyles(baseLength, index, isLeft);

      return (
        <React.Fragment key={index}>
          <path d={path.d} stroke="#121212" strokeWidth="52" style={styles} />
          <path d={path.d} stroke={path.color} strokeWidth="48" style={styles} />
        </React.Fragment>
      );
    })}
  </svg>
);

const STRIP_COUNT = sideBaseLengths.length;
const TOTAL_ANIMATION_DURATION = 1000;
const STAGGER_DELAY_PER_STRIP = 100;
const PRELOADER_START_DELAY = 1000;

const calculatePreloaderStyles = (baseLength, index, isLeft, animationProgress) => {
  const startDelayRatio = (index * STAGGER_DELAY_PER_STRIP) / TOTAL_ANIMATION_DURATION;

  const stripProgress = Math.min(
    1,
    Math.max(0, (animationProgress - (startDelayRatio * animationProgress)) / (1 - startDelayRatio))
  );

  const easedProgress = Math.pow(stripProgress, 3);
  const currentLength = easedProgress * baseLength;
  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;
  const offset = isLeft ? -(baseLength - currentLength) : 0;

  return {
    strokeDasharray: dashArray,
    strokeDashoffset: `${offset.toFixed(3)}`,
  };
};

const PreloaderSideStrokes = ({ onComplete }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const checkIsDesktop = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isDesktopDevice = window.innerWidth > 1024;
      setIsDesktop(isDesktopDevice);
    }
  }, []);

  useEffect(() => {
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, [checkIsDesktop]);

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

  const getPreloaderStyles = useCallback((baseLength, index, isLeft) => 
    calculatePreloaderStyles(baseLength, index, isLeft, animationProgress), 
    [animationProgress]
  );

  return (
    <div className="preloader-container">
      <style>{`
        .preloader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background: #f3ecd2;
          overflow: hidden; 
        }
        body {
          overflow: hidden;
          height: 100vh;
        }
        .rainbow-sides__right {
          width: 20.0625em;
          position: fixed;
          top: 0;
          right: -4.75em;
          display: none;
        }
        .rainbow-sides__left {
          width: 20.0625em;
          position: fixed;
          display: none;
        }
        @media (min-width: 1025px) {
          .rainbow-sides__right {
            display: block;
          }
          .rainbow-sides__left {
            display: block;
          }
        }
      `}</style>
      
      {isDesktop && <SideStrokesSVG sideClass="rainbow-sides__right" isLeft={false} calculateStyles={getPreloaderStyles} />}
      {isDesktop && <SideStrokesSVG sideClass="rainbow-sides__left" isLeft={true} calculateStyles={getPreloaderStyles} />}
    </div>
  );
};

const sideTriggerOffset = 154;
const centerBaseLength = 600;
const CENTER_STRIP_COUNT = 9;
const CENTER_ANIMATION_LENGTH = 1200;

const centerPathData = [
  { d: "M426 0V600", color: "#F97028" },
  { d: "M376 0V600", color: "#F489A3" },
  { d: "M326 0V600", color: "#F0BB0D" },
  { d: "M276 0V600", color: "#F3A20F" },
  { d: "M226 0V600", color: "#F97028" },
  { d: "M176 0V600", color: "#F489A3" },
  { d: "M126 0V600", color: "#F0BB0D" },
  { d: "M76 0V600", color: "#F3A20F" },
  { d: "M26 0V600", color: "#F97028" },
];

const calculateSidePathStyles = (baseLength, index, isLeft, scrollPercent) => {
  const totalAnimationDistance = sideBaseLengths[0] + (sideTriggerOffset * 3);
  const totalScroll = scrollPercent * totalAnimationDistance;
  const startPoint = index * sideTriggerOffset;
  const stripScroll = Math.max(0, totalScroll - startPoint);
  
  const currentLength = Math.max(0, baseLength - stripScroll);
  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;
  const offset = isLeft ? -(baseLength - currentLength) : 0;
  
  return {
    strokeDasharray: dashArray,
    strokeDashoffset: `${offset.toFixed(3)}`,
  };
};

const calculateCenterPathStyles = (baseLength, index, scrollPercent) => {
  const totalScroll = scrollPercent * CENTER_ANIMATION_LENGTH;

  const t = index / (CENTER_STRIP_COUNT - 1);
  const easedProgress = 1 - (1 - t) * (1 - t);
  
  const TOTAL_DELAY_DISTANCE = CENTER_ANIMATION_LENGTH - baseLength;
  const staggerDelay = easedProgress * TOTAL_DELAY_DISTANCE;

  const startPoint = staggerDelay;
  const stripScroll = Math.max(0, totalScroll - startPoint);

  const currentLength = Math.min(baseLength, stripScroll);

  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}px, ${gap.toFixed(3)}px`;
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
      const newScrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPercent(newScrollPercent);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  const getHeroSideStyles = useCallback((baseLength, index, isLeft) => 
    calculateSidePathStyles(baseLength, index, isLeft, scrollPercent), 
    [scrollPercent]
  );

  return (
    <>
      <style>{`
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
          display: none;
        }
        
        .rainbow-sides__left {
          width: 20.0625em;
          position: fixed;
          z-index: 10;
          display: none;
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

        @media (min-width: 1025px) {
          .rainbow-sides__right {
            display: block;
          }
          .rainbow-sides__left {
            display: block;
          }
        }
      `}</style>
      
      <div className="scroll-container" style={{ height: '400vh', position: 'relative' }}>
        
        <SvgVerticalStrokes scrollPercent={scrollPercent} />

        <SideStrokesSVG 
          sideClass="rainbow-sides__right" 
          isLeft={false} 
          calculateStyles={getHeroSideStyles} 
        />
        
        <SideStrokesSVG 
          sideClass="rainbow-sides__left" 
          isLeft={true} 
          calculateStyles={getHeroSideStyles} 
        />
      </div>
    </>
  );
};

const App = () => {
    const [isPreloading, setIsPreloading] = useState(true);

    const handlePreloaderComplete = useCallback(() => {
        setIsPreloading(false);
    }, []);

    return (
        <>
            {isPreloading && <PreloaderSideStrokes onComplete={handlePreloaderComplete} />}
            {!isPreloading && <HeroTwinStrokes />}
        </>
    );
};

export default App;