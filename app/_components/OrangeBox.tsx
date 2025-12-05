import React from "react";
import { ORANGE_BOX_STYLES } from "../constants/stripeConstants";

const OrangeBox = ({
  message,
  messagePhase,
  isPreloader = false,
  showCursor = false,
}) => (
  <div className="relative">
    <div
      className={`
    flex items-center justify-center
    bg-[#F97028] text-white border border-black
    whitespace-nowrap
    rounded-[9px] md:rounded-[14.86px]
    tracking-[-0.287179px] md:tracking-normal
    h-[23.41px] md:h-[35.6px]
    px-[8.61539px] md:px-[12.7333px]
    text-[11.4872px] md:text-[16.9778px] leading-[14.9333px] md:leading-[22.0711px]
    transition-[width] ${isPreloader ? "duration-75 ease-out" : "duration-0"}
    ${!isPreloader ? " md:w-[298.025px]" : "w-auto"}
  `}
    >
      <p className="m-0 p-0 tracking-[-0.424444px] z-[10]">{message}</p>

      {showCursor && (
        <span
          className="
        inline-block ml-0.5
        w-[2px] h-[1em] bg-white
        animate-[blink_0.8s_step-end_infinite]
      "
        />
      )}
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      viewBox="0 0 22 13"
      fill="none"
      className={`
  absolute z-[1] w-[14px] md:w-[22px]
  left-[-5px] md:left-[-8px] bottom-[-0.6px] md:bottom-[-0.5px]
  ${
    isPreloader
      ? "transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      : "transition-none"
  }
`}
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
