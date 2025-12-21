/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { verticalStrips } from "../constants/stripeConstants";

const verticalStripBaseLengths = [600, 600, 600, 600, 600, 600, 600, 600, 600];
const verticalStripTriggerOffset = 100;
const VERTICAL_STRIP_COUNT = verticalStripBaseLengths.length;


const calculateVerticalStripStyles = (baseLength, index, scrollPercent) => {
  const verticalScrollMultiplier = 9.7;
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
    style={{ height: "1200px" }}
  >
    {/* Black strokes (background) */}
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

    {/* Colored strokes (foreground) */}
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

export default function ScrollTriggerStrips() {
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
  <div className="flex flex-col items-center relative ">
    <motion.div
      ref={verticalContainerRef}
      className="mx-auto  flex justify-center m-0 w-[247.238px] md:w-[416.225px] lg:w-[321.413px] xl:w-[452px] 2xl:w-[482.125px]"
    >
      <VerticalScrollStripsSVG calculateStyles={getVerticalStripStyles} />
    </motion.div>

    <div className="h-96" />
  </div>
);

}