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

const SVG_WIDTH = 480.125;
const TOTAL_HEIGHT = 100;        // GSAP math height
const RENDER_HEIGHT = 391.325;   // visual height

const BG_WIDTH = 52;
const FG_WIDTH = 48;

/* Scroll tuning */
const SCROLL_MULTIPLIER = 11;
const BASE_OFFSET = 300;
const BASE_DURATION = 1180;

/* ---------------- COMPONENT ---------------- */

export default function GSAPVerticalStrips() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const OFFSET_STEP = BASE_OFFSET / SCROLL_MULTIPLIER;
    const DURATION = BASE_DURATION / SCROLL_MULTIPLIER;

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

      const offset = i * OFFSET_STEP;

      gsap.to([bg, fg], {
        strokeDashoffset: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: svgRef.current,
          start: `top+=${offset} 103%`,
          end: `top+=${offset + DURATION} 20%`,
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

return (
    <div className="relative z-0">  
      <div className="overflow-hidden flex items-center justify-center">
        <div>
          
        </div>
        {/* Perspective container */}
        <div className="[perspective:245px] " style={{ width: `${SVG_WIDTH}px` }}>
          <svg
            ref={svgRef}
            width={SVG_WIDTH}
            height={RENDER_HEIGHT}
            viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
            preserveAspectRatio="none"
            className="
              block
              [transform-style:preserve-3d]
              [transform:rotateX(45deg)]
            "
          >
            {/* Black strips */}
            {STRIPS.map((s, i) => (
              <path
                key={`bg-${i}`}
                id={`strip-bg-${i}`}
                d={`M${s.x} 0V${TOTAL_HEIGHT}`}
                stroke="black"
                strokeWidth={BG_WIDTH}
              />
            ))}

            {/* Color strips */}
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
      </div>
    </div>
  );
}