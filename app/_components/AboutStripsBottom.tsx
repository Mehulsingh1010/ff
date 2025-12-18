/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { verticalStrips } from "../constants/stripeConstants";

const verticalStripBaseLengths = [600, 600, 600, 600, 600, 600, 600, 600, 600];
const verticalStripTriggerOffset = 160;
const VERTICAL_STRIP_COUNT = verticalStripBaseLengths.length;



const calculateVerticalStripStyles = (baseLength, index, scrollPercent) => {
  const verticalScrollMultiplier = 4.0;
  const amplifiedScroll = scrollPercent * verticalScrollMultiplier;

  const totalAnimationDistance =
    verticalStripBaseLengths[0] + verticalStripTriggerOffset * (VERTICAL_STRIP_COUNT - 1);
  const totalScroll = amplifiedScroll * totalAnimationDistance;
  const startPoint = index * verticalStripTriggerOffset;
  const stripScroll = Math.max(0, totalScroll - startPoint);

  const currentLength = Math.min(baseLength, stripScroll);
  const gap = baseLength - currentLength;
  const dashArray = `${currentLength.toFixed(3)}, ${gap.toFixed(3)}`;

  return {
    strokeDasharray: dashArray,
    strokeDashoffset: 0,
  };
};

const VerticalScrollStripsSVG = ({ calculateStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 452 600"
    fill="none"
    preserveAspectRatio="none"
    style={{ height: "600px" }}
  >
   
    {verticalStrips.map((strip, index) => {
      const baseLength = verticalStripBaseLengths[index];
      const styles = calculateStyles(baseLength, index);

      return (
        <motion.path
          key={`vertical-black-${index}`}
          d={`M${strip.x} 0V600`}
          stroke="black"
          strokeWidth="52"
          strokeDasharray={styles.strokeDasharray}
          strokeDashoffset={styles.strokeDashoffset}
        />
      );
    })}

    {verticalStrips.map((strip, index) => {
      const baseLength = verticalStripBaseLengths[index];
      const styles = calculateStyles(baseLength, index);

      return (
        <motion.path
          key={`vertical-color-${index}`}
          d={`M${strip.x} 0V600`}
          stroke={strip.colorFill}
          strokeWidth="48"
          strokeDasharray={styles.strokeDasharray}
          strokeDashoffset={styles.strokeDashoffset}
        />
      );
    })}
  </svg>
);

export default function ScrollTriggerStrips2() {
  const [verticalScrollPercent, setVerticalScrollPercent] = useState(0);
  const verticalContainerRef = useRef(null);

  const handleVerticalScroll = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      document.documentElement.scrollHeight > window.innerHeight
    ) {
      const newScrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVerticalScrollPercent(newScrollPercent);
    }
  }, []);

  useEffect(() => {
    handleVerticalScroll();
    window.addEventListener("scroll", handleVerticalScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleVerticalScroll);
    };
  }, [handleVerticalScroll]);

  const getVerticalStripStyles = useCallback(
    (baseLength, index) =>
      calculateVerticalStripStyles(baseLength, index, verticalScrollPercent),
    [verticalScrollPercent]
  );

  return (
   <div className="[perspective:355px]">
  <motion.div
    ref={verticalContainerRef}
    className="
      relative
      mx-auto
      ml-[-24px]
      md:ml-auto
      w-[340px]
      md:w-[564px]
      lg:w-[500px]
      xl:w-[700px]
      2xl:w-[612px]
      h-[200px]
      md:h-[180px]
      lg:h-[151.8px]
      xl:h-[200px]
      2xl:h-[190px]
      pb-[270px]
      overflow-hidden
      [transform-style:preserve-3d]
      [transform:rotateX(45deg)]
    "
  >
    <VerticalScrollStripsSVG calculateStyles={getVerticalStripStyles} />
  </motion.div>
</div>

  );
}