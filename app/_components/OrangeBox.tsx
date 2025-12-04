import React from 'react';
import { ORANGE_BOX_STYLES } from '../constants/stripeConstants';

const OrangeBox = ({ message, messagePhase, isPreloader = false, showCursor = false }) => (
  <div className="relative">
    <div
      className="flex items-center justify-center bg-[#F97028] text-white border-black whitespace-nowrap"
      style={{
        fontSize: ORANGE_BOX_STYLES.fontSize,
        lineHeight: ORANGE_BOX_STYLES.lineHeight,
        padding: ORANGE_BOX_STYLES.padding,
        minHeight: ORANGE_BOX_STYLES.minHeight,
        width: !isPreloader ? "298.025px" : "auto",
        borderRadius: ORANGE_BOX_STYLES.borderRadius,
        borderWidth: ORANGE_BOX_STYLES.borderWidth,
        borderStyle: "solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: isPreloader ? "width 0.05s ease-out" : "none",
      }}
    >
      <p className="m-0 p-0" style={{ letterSpacing: ORANGE_BOX_STYLES.tracking }}>
        {message}
      </p>
      {showCursor && (
        <span
          className="inline-block ml-0.5"
          style={{
            width: "2px",
            height: "1em",
            backgroundColor: "white",
            animation: "blink 0.8s step-end infinite",
          }}
        />
      )}
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      viewBox="0 0 22 13"
      fill="none"
      className="absolute"
      style={{
        left: "-8px",
        bottom: "-0.5px",
        transition: isPreloader ? "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
      }}
    >
      <path
        d="M13.2965 8.70441C15.5695 10.5858 18.4864 11.7165 21.6675 11.7165L21.67 1H8.70396C8.87681 7.22251 4.20993 10.3338 3 10.8523C7.39294 11.651 11.029 10.2151 13.2965 8.70441Z"
        fill="#FF6B35"
      />
      <path
        d="M21.6675 11.7165C18.4864 11.7165 15.5695 10.5858 13.2965 8.70441C11.029 10.2151 7.39294 11.651 3 10.8523C4.20993 10.3338 8.87681 7.22251 8.70396 1"
        stroke="#121212"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default OrangeBox;