"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- CONFIG ---------------- */

const STRIP_COUNT = 9;

const COLORS = [
  "#F97028",
  "#F489A3",
  "#F0BB0D",
  "#F3A20F",
  "#F97028",
  "#F489A3",
  "#F0BB0D",
  "#F3A20F",
  "#F97028",
];

const SVG_WIDTH = 482.125;
const TOTAL_HEIGHT = 1200;

/* overlap factor = no gaps */
const OVERLAP = 1.05;

/* Scroll tuning */
const SCROLL_MULTIPLIER = 2.6;
const BASE_OFFSET = 156;
const BASE_DURATION = 1880;

/* ---------------- COMPONENT ---------------- */

export default function GSAPVerticalStrips() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    for (let i = 0; i < STRIP_COUNT; i++) {
      const bg = svgRef.current.querySelector(
        `#strip-bg-${i}`
      ) as SVGPathElement;

      const fg = svgRef.current.querySelector(
        `#strip-fg-${i}`
      ) as SVGPathElement;

      if (!bg || !fg) continue;

      const length = bg.getTotalLength();

      gsap.set([bg, fg], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const offset = (i * BASE_OFFSET) / SCROLL_MULTIPLIER;
      const duration = BASE_DURATION / SCROLL_MULTIPLIER;

      gsap.to([bg, fg], {
        strokeDashoffset: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: svgRef.current,
          start: `top+=${offset} 170%`,
          end: `top+=${offset + duration} 0%`,
          scrub: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  /* ---- FULL WIDTH MATH ---- */
  const STEP = SVG_WIDTH / STRIP_COUNT;
  const STROKE_BG = STEP * OVERLAP;
  const STROKE_FG = STROKE_BG * 0.92;
  const START_X = SVG_WIDTH - STEP / 2;

  return (
    <div className="w-[247.238px] md:w-[416.225px] lg:w-[321.413px] xl:w-[452px] 2xl:w-[482.125px]  mx-auto">
      <div className="relative mx-auto flex justify-center">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
          preserveAspectRatio="none"
          style={{ height: `${TOTAL_HEIGHT}px`, display: "block" }}
        >
          {/* BLACK STRIPS */}
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const x = START_X - i * STEP;

            return (
              <path
                key={`bg-${i}`}
                id={`strip-bg-${i}`}
                d={`M${x} 0V${TOTAL_HEIGHT}`}
                stroke="black"
                strokeWidth={STROKE_BG}
              />
            );
          })}

          {/* COLOR STRIPS */}
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const x = START_X - i * STEP;

            return (
              <path
                key={`fg-${i}`}
                id={`strip-fg-${i}`}
                d={`M${x} 0V${TOTAL_HEIGHT}`}
                stroke={COLORS[i]}
                strokeWidth={STROKE_FG}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
