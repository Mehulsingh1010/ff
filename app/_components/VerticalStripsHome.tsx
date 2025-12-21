    "use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- CONFIG ---------------- */

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

/*  CONTROL THIS */
const SCROLL_MULTIPLIER = 2   // ↑ faster, ↓ slower

const BASE_OFFSET = 130;
const BASE_DURATION = 1880;

/* ---------------- COMPONENT ---------------- */

export default function GSAPVerticalStrips() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    STRIPS.forEach((_, i) => {
      const bg = svgRef.current!.querySelector(
        `#strip-bg-${i}`
      ) as SVGPathElement;

      const fg = svgRef.current!.querySelector(
        `#strip-fg-${i}`
      ) as SVGPathElement;

      if (!bg || !fg) return;

      const length = bg.getTotalLength();

      // start hidden
      gsap.set([bg, fg], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // apply multiplier
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
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="relative flex  justify-center px-20 ">
      <svg
        ref={svgRef}
        width={SVG_WIDTH}
        viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
        preserveAspectRatio="none"
        style={{ height: `${TOTAL_HEIGHT}px` }}
      >
        {/* BLACK STRIPS */}
        {STRIPS.map((s, i) => (
          <path
            key={`bg-${i}`}
            id={`strip-bg-${i}`}
            d={`M${s.x} 0V${TOTAL_HEIGHT}`}
            stroke="black"
            strokeWidth={BG_WIDTH}
          />
        ))}

        {/* COLOR STRIPS */}
        {STRIPS.map((s, i) => (
          <path
            key={`fg-${i}`}
            id={`strip-fg-${i}`}
            d={`M${s.x} 0V${TOTAL_HEIGHT}`}
            stroke={s.color}
            strokeWidth={FG_WIDTH}
          />
        ))}
      </svg>
    </div>
  );
}
