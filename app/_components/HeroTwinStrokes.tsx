import React, { useState, useCallback, useEffect } from 'react';
import { calculateSidePathStyles } from '../utils/stripeCalculations';
import SideStrokesSVG from './SideStrokesSVG';

const HeroTwinStrokes = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      document.documentElement.scrollHeight > window.innerHeight
    ) {
      const newScrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPercent(newScrollPercent);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const getHeroSideStyles = useCallback(
    (baseLength, index, isLeft) =>
      calculateSidePathStyles(baseLength, index, isLeft, scrollPercent),
    [scrollPercent]
  );

  return (
    <>
    <div className="hidden md:hidden lg:block">
      <style>{`
        .rainbow-sides__right {
          position: fixed;
          top: 0;
          right: -4.75em;
          z-index: 1;
          pointer-events: none;
          display: block;
        }
        .rainbow-sides__left {
          position: fixed;
          bottom: 0;
          left: -4.5em;
          z-index: 1;
          pointer-events: none;
          display: block;
        }
      `}</style>
      

      <SideStrokesSVG
        sideClass="rainbow-sides__right relative"
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

export default HeroTwinStrokes;
