'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function WTE() {
  const barsRef = useRef([]);
  const imagesRef = useRef([]);
  const tweensRef = useRef([]);

  useEffect(() => {
    // Initialize GSAP tweens for each image
    tweensRef.current = imagesRef.current.map((img, i) => {
      const isLeft = i % 2 === 0; // Alternate left/right
      
      // Set initial position (Hidden & Tilted)
      gsap.set(img, { 
        opacity: 0,
        scale: 0.8,
        x: isLeft ? -20 : 20,
        // Image is initially slightly tilted (-3 / 3 degrees)
        rotation: isLeft ? -3 : 3
      });

      // Create paused tween with pop-out effect
      return gsap.to(img, {
        opacity: 1,
        scale: 1,
        x: 0,
        // Animates to a slightly greater tilt (-5 / 5 degrees)
        rotation: isLeft ? -5 : 5, 
        duration: 0.4,
        ease: "back.out(1.4)",
        paused: true,
        
        // Z-Index Fix: Ensures the current bar (parent) and image stack above siblings
        onStart: () => {
          // Immediately set the parent bar's zIndex high when starting the pop-out
          gsap.set(barsRef.current[i], { zIndex: 100 });
        },
        onReverseComplete: () => {
          // Reset the parent bar's zIndex *only after* the image has fully reversed
          gsap.set(barsRef.current[i], { zIndex: 10 }); 
        }
      });
    });

    // Add event listeners to bars
    barsRef.current.forEach((bar, i) => {
      const tween = tweensRef.current[i];
      
      const handleMouseEnter = () => {
        // Play forward (pop out)
        tween.timeScale(1).play();
      };
      
      const handleMouseLeave = () => {
        // Reverse faster (pop back in)
        tween.timeScale(2.5).reverse();
      };

      if (bar) {
        bar.addEventListener("mouseenter", handleMouseEnter);
        bar.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    // Cleanup
    return () => {
      // Kill tweens on unmount to prevent memory leaks
      tweensRef.current.forEach(tween => tween.kill());
    };
  }, []);

  const bars = [
    { title: "Expert Talks", color: "#F97028", border: "#D45F22", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd92bb1ada35b5840_event-image-2.avif", side: "left", px: "424px", width: "264px" },
    { title: "Fun + Games", color: "#F489A3", border: "#D0758B", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd04f4257c5f7f85fc_event-image-5.avif", side: "right", px: "424px", width: "264px" },
    { title: "Food + Drink", color: "#F3A20F", border: "#CF8A0D", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddb9d81bad24595e36_event-image-4.avif", side: "left", px: "429px", width: "256px" },
    { title: "Live Music", color: "#F0BB0D", border: "#CC9F0B", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd1a93d98874d5b679_event-image-3.avif", side: "right", px: "446px", width: "222px" },
    { title: "Community", color: "#F97028", border: "#D45F22", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd793e76751328121_event-image-1.avif", side: "left", px: "433px", width: "247px" }
  ];

  return (
    <>
      <div className="h-[60px] bg-[linear-gradient(to_right,black_50%,#F97028_50%)]">
      </div>
      <div className="pl-[67px] bg-black flex font-heading-bold relative" style={{ zIndex: 1 }}>
        <div className="text-white px-11 py-[118px] h-[509px] box-border flex justify-center items-center">
          <div className="h-[272px] w-[122px] font-heading-bold flex justify-center items-center">
            <h2
              className="text-[67.9111px] leading-[0.9] whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                textAlign: 'center',
                transform: 'rotate(180deg)',
              }}
            >
              What to <br /> Expect
            </h2>
          </div>
        </div>

        <div className="pl-[68px]"></div>

        <div className="flex flex-col relative" style={{ zIndex: 10 }}>
          {bars.map((bar, index) => (
            <div
              key={index}
              ref={el => {barsRef.current[index] = el}}
              className="h-[102px] w-[1200px] pt-[30px] cursor-pointer relative"
              style={{
                backgroundColor: bar.color,
                borderTop: index > 0 ? '1.6px solid black' : 'none',
                // This thick border is likely causing the initial clipping
                borderBottom: index < bars.length - 1 ? `7px solid ${bar.border}` : 'none',
                paddingLeft: bar.px,
                // Initial zIndex is low, and GSAP will control the elevation
                zIndex: 10 
              }}
            >
              <div 
                className="h-[46px] text-[50.9333px] leading-[45.84px] whitespace-nowrap text-[#FFFEFB]" 
                style={{ width: bar.width }}
              >
                {bar.title}
              </div>
              
              {/* Image */}
              <div
                ref={el => {imagesRef.current[index] = el}}
                className="absolute top-[50%] pointer-events-none z-[100001]"
                style={{
                  [bar.side]: '50px',
                  transform: 'translateY(-50%)',
                  width: '293.9px',
                  height: '345.325px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.6px solid #1a1a1a',
                  // **CRITICAL FIX:** Removed zIndex: 1000 here. 
                  // GSAP's onStart callback controls the PARENT's zIndex, 
                  // which is what's needed for proper stacking.
                }}
              >
                <img 
                  src={bar.img}
                  alt={bar.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[60px] bg-[linear-gradient(to_right,black_50%,#F97028_50%)]">
      </div>
    </>
  );
}

export default WTE;