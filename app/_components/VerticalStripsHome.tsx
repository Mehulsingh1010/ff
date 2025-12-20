"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ============ CONFIG ============ */

const STRIPS = [
  { x: 452, color: "#F97028" },
  { x: 402, color: "#F489A3" },
  { x: 352, color: "#F0BB0D" },
  { x: 302, color: "#F3A20F" },
  { x: 252, color: "#F97028" },
  { x: 202, color: "#F489A3" },
  { x: 152, color: "#F0BB0D" },
  { x: 102, color: "#F3A20F" },
  { x: 52,  color: "#F97028" },
];

const SVG_WIDTH = 482.125;
const TOTAL_HEIGHT = 1200;

const BG_WIDTH = 52;
const FG_WIDTH = 48;

const SCROLL_MULTIPLIER = 20;
const BASE_OFFSET = 90;
const BASE_DURATION = 1400;

/* ============ COMPONENT ============ */

export default function GSAPVerticalStrips() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [stripLengths, setStripLengths] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate total length of each strip on mount
  useEffect(() => {
    if (!svgRef.current) return;

    const lengths = STRIPS.map((_, i) => {
      const path = svgRef.current?.querySelector(`#strip-bg-${i}`);
      return path ? path.getTotalLength() : TOTAL_HEIGHT;
    });

    setStripLengths(lengths);
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // How far the container has scrolled into view (0 to 1)
    const scrolled = Math.max(0, 1 - rect.bottom / viewportHeight);
    setScrollProgress(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Calculate dash offset for each strip
  const getStripStyles = (index) => {
    if (!stripLengths) return { strokeDashoffset: stripLengths?.[index] || TOTAL_HEIGHT };

    const length = stripLengths[index];
    const offset = (index * BASE_OFFSET) / SCROLL_MULTIPLIER;
    const duration = BASE_DURATION / SCROLL_MULTIPLIER;

    // Scroll position relative to this strip's trigger
    const relativeScroll = Math.max(0, scrollProgress * TOTAL_HEIGHT - offset);
    const progress = Math.min(1, relativeScroll / duration);

    // Animate from full offset to 0
    const dashOffset = length * (1 - progress);

    return { strokeDashoffset: dashOffset };
  };

  return (
    <div className="relative flex justify-center px-20">
      <motion.div
        ref={containerRef}
        className="flex justify-center"
      >
        <svg
          ref={svgRef}
          width={SVG_WIDTH}
          viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
          preserveAspectRatio="none"
          style={{ height: `${TOTAL_HEIGHT}px` }}
        >
          {/* BLACK STRIPS */}
          {STRIPS.map((s, i) => (
            <motion.path
              key={`bg-${i}`}
              id={`strip-bg-${i}`}
              d={`M${s.x} 0V${TOTAL_HEIGHT}`}
              stroke="black"
              strokeWidth={BG_WIDTH}
              strokeDasharray={stripLengths?.[i] || TOTAL_HEIGHT}
              strokeDashoffset={getStripStyles(i).strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.016s linear" }}
            />
          ))}

          {/* COLOR STRIPS */}
          {STRIPS.map((s, i) => (
            <motion.path
              key={`fg-${i}`}
              id={`strip-fg-${i}`}
              d={`M${s.x} 0V${TOTAL_HEIGHT}`}
              stroke={s.color}
              strokeWidth={FG_WIDTH}
              strokeDasharray={stripLengths?.[i] || TOTAL_HEIGHT}
              strokeDashoffset={getStripStyles(i).strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.016s linear" }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}