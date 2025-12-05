/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const verticalStripBaseLengths = [600, 600, 600, 600, 600, 600, 600, 600, 600];
const verticalStripTriggerOffset = 100;
const VERTICAL_STRIP_COUNT = verticalStripBaseLengths.length;

const verticalStrips = [
  { x: 426, color: "black", colorFill: "#F97028" },
  { x: 376, color: "black", colorFill: "#F489A3" },
  { x: 326, color: "black", colorFill: "#F0BB0D" },
  { x: 276, color: "black", colorFill: "#F3A20F" },
  { x: 226, color: "black", colorFill: "#F97028" },
  { x: 176, color: "black", colorFill: "#F489A3" },
  { x: 126, color: "black", colorFill: "#F0BB0D" },
  { x: 76, color: "black", colorFill: "#F3A20F" },
  { x: 26, color: "black", colorFill: "#F97028" },
];

const calculateVerticalStripStyles = (baseLength, index, scrollPercent) => {
  const verticalScrollMultiplier = 8.7;
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
    <div className="flex flex-col  ">
      <motion.div
        ref={verticalContainerRef}
        className="flex justify-center m-0 w-[299px] md:w-[480px] "   
      >
        <VerticalScrollStripsSVG calculateStyles={getVerticalStripStyles} />
      </motion.div>

      <div className="h-96" />
    </div>
  );
}