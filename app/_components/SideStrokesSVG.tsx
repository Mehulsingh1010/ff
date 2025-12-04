import React from 'react';
import { sidePaths } from '../constants/stripeConstants';

const SideStrokesSVG = ({ sideClass, isLeft, calculateStyles, isPreloader = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 321 626"
    fill="none"
    className={sideClass}
    style={
      isLeft
        ? { top: "23.17em", left: "-4.5em", transform: "scale(-1.05)", width: "20.0625em", height: "auto" }
        : { top: "1.05rem", right: "-4.3em", transform: "scale(1.07)", width: "20.0625em", height: "auto" }
    }
  >
    {sidePaths.map((path, index) => {
      const baseLength = index < 4 ? [809.204, 730.653, 652.102, 573.551][index] : 0;
      const styles = calculateStyles(baseLength, index, isLeft);

      return (
        <React.Fragment key={index}>
          <path d={path.d} stroke="#121212" strokeWidth="52" style={styles} />
          <path d={path.d} stroke={path.color} strokeWidth="48" style={styles} />
        </React.Fragment>
      );
    })}
  </svg>
);

export default SideStrokesSVG;