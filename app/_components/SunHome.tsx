'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * A standalone component with a sun and an interactive face that follows the cursor 
 * and winks on hover.
 * * 🚨 NOTE: The component's position is now inline ('relative'/'static' flow) 
 * and determined by where it is rendered in the parent component.
 */
function SunHomeInline() {
  const faceRef = useRef(null);
  const rightEyeRef = useRef(null);
  const winkRef = useRef(null);
  const sunContainerRef = useRef(null);
  const componentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 

  // --- HARDCODED SVG PATH ---
  const SVG_SRC = '/svg/sun.svg'; 

  // --- Mouse Interaction Effects (Face Follow and Wink ONLY) ---
  useEffect(() => {
    const face = faceRef.current;
    const rightEye = rightEyeRef.current;
    const winkEye = winkRef.current;
    const sunContainer = sunContainerRef.current;

    if (!face || !sunContainer) return;

    // Initial state: Set wink to invisible
    if (winkEye) {
      gsap.set(winkEye, { opacity: 0 });
    }

    // Mouse move handler - face follows cursor
    const handleMouseMove = (e) => {
      const sunRect = sunContainer.getBoundingClientRect();
      const sunCenterX = sunRect.left + sunRect.width / 2;
      const sunCenterY = sunRect.top + sunRect.height / 2;

      const deltaX = e.clientX - sunCenterX;
      const deltaY = e.clientY - sunCenterY;

      const maxMove = 300;
      const divisor = 6;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX / divisor));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY / divisor));

      gsap.to(face, {
        x: moveX,
        y: moveY -20,
        // Tilt is now applied via static `style` prop for initial state,
        // and we ensure GSAP only animates x and y for movement.
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Hover in: Wink
    const handleFaceMouseEnter = () => {
      // Hide normal eye, show wink
      gsap.to(rightEye, { opacity: 0, duration: 0 });
      gsap.to(winkEye, { opacity: 1, duration: 0 });
    };

    // Hover out: Normal Eye
    const handleFaceMouseLeave = () => {
      // Show normal eye, hide wink
      gsap.to(rightEye, { opacity: 1, duration: 0 });
      gsap.to(winkEye, { opacity: 0, duration: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    sunContainer.addEventListener("mouseenter", handleFaceMouseEnter);
    sunContainer.addEventListener("mouseleave", handleFaceMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      sunContainer.removeEventListener("mouseenter", handleFaceMouseEnter);
      sunContainer.removeEventListener("mouseleave", handleFaceMouseLeave);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      // POSITIONING CHANGE: Removed fixed, bottom-[33px], left-[33px]
      // It now uses default static/relative positioning in the flow.
      className="inline-flex items-center z-40" 
      style={{
        // transform: 'translateX(0%)' is kept but is now unnecessary as there's no initial hidden state
        transform: 'translateX(0%)',
      }}
    >
      {/* Sun SVG Container (Interactive Area) */}
      <div
        ref={sunContainerRef}
        className= " h-[45.94px] w-[45.94px] md:w-[59px] lg:w-[67.9px] md:h-[59px] lg:h-[67.9px]  pointer-events-auto relative flex-shrink-0"
      >
        {/* Rotating Sun Image (Always Visible) */}
        <div className="animate-[spin_20s_linear_infinite] w-full h-full">
          {/* Directly use the hardcoded SVG_SRC constant */}
          <img 
            src={SVG_SRC} 
            alt="sun" 
            className="w-full h-full" 
          />
        </div>

        {/* Smiley Face SVG (Always Visible) */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 420 420"
        >
          {/* FACE GROUP: Follows Cursor */}
          <g 
            ref={faceRef}
            style={{ 
              // ADDED: Apply -10 degree rotation transformation to the face group
              transform: 'rotate(-10deg)', 
              // Set the rotation origin to the center of the face group's viewBox coordinates
              transformOrigin: '210px 210px' 
            }}
          >
            {/* Teeth Smile (hidden) */}
            <g
              opacity="0"
              transform="translate(190 200) scale(2.5)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ overflow: 'visible' }}>
                <path d="M11.8921 18C5.9557 19.2392 4.66149 14.9968 3.5863 11.9479C3.37455 11.3475 3.80655 10.6869 4.44285 10.6652C9.15161 10.5051 11.2843 10.3509 14.8793 8.66061C15.4922 8.37244 16.2307 8.80754 16.2719 9.48354C16.4616 12.6034 16.766 16.6483 11.8921 18Z" fill="var(--color-light, white)" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                <path d="M4.5 14C9.24535 14.5931 13.9652 13.5983 16 12" fill="white" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"/>
              </svg>
            </g>

            {/* Eyes and Wink */}
            <circle cx="170" cy="180" r="11" fill="#121212"/> {/* Left Eye */}
            <circle ref={rightEyeRef} cx="230" cy="180" r="11" fill="#121212"/> {/* Right Eye (Normal) */}

            <g ref={winkRef} opacity="0" transform="translate(195 178) scale(3.5)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ overflow: 'visible' }}>
                <path d="M10.5 2L14.5 1.49999" stroke="#121212" strokeWidth="2.5" strokeLinecap="round"/> {/* Wink Slit */}
              </svg>
            </g>

            {/* Normal Smile */}
            <path d="M160 240 Q200 270 240 240" stroke="#121212" strokeWidth="9" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      {/* Tailwind CSS keyframes for rotation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default SunHomeInline;