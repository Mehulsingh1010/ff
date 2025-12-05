'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function WTE() {
  const barsRef = useRef([]);
  const imagesRef = useRef([]);
  const tweensRef = useRef([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check screen size on mount and resize
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize GSAP tweens for each image
    tweensRef.current = imagesRef.current.map((img, i) => {
      const isLeft = i % 2 === 0;
      
      gsap.set(img, { 
        opacity: 0,
        scale: 0.8,
        x: isLeft ? -20 : 20,
        rotation: isLeft ? -3 : 3
      });

      return gsap.to(img, {
        opacity: 1,
        scale: 1,
        x: 0,
        rotation: isLeft ? -5 : 5, 
        duration: 0.4,
        ease: "back.out(1.4)",
        paused: true,
        
        onStart: () => {
          gsap.set(barsRef.current[i], { zIndex: 100 });
        },
        onReverseComplete: () => {
          gsap.set(barsRef.current[i], { zIndex: 10 }); 
        }
      });
    });

    barsRef.current.forEach((bar, i) => {
      const tween = tweensRef.current[i];
      
      const handleMouseEnter = () => {
        if (isLargeScreen) {
          tween.timeScale(1).play();
        }
      };
      
      const handleMouseLeave = () => {
        if (isLargeScreen) {
          tween.timeScale(2.5).reverse();
        }
      };

      if (bar) {
        bar.addEventListener("mouseenter", handleMouseEnter);
        bar.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      tweensRef.current.forEach(tween => tween.kill());
    };
  }, [isLargeScreen]);

  const bars = [
    { title: "Expert Talks", color: "#F97028", border: "#D45F22", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd92bb1ada35b5840_event-image-2.avif", side: "left", px: "424px", width: "264px" },
    { title: "Fun + Games", color: "#F489A3", border: "#D0758B", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd04f4257c5f7f85fc_event-image-5.avif", side: "right", px: "424px", width: "264px" },
    { title: "Food + Drink", color: "#F3A20F", border: "#CF8A0D", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddb9d81bad24595e36_event-image-4.avif", side: "left", px: "429px", width: "256px" },
    { title: "Live Music", color: "#F0BB0D", border: "#CC9F0B", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aadd1a93d98874d5b679_event-image-3.avif", side: "right", px: "446px", width: "222px" },
    { title: "Community", color: "#F97028", border: "#D45F22", img: "https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/6824aaddd793e76751328121_event-image-1.avif", side: "left", px: "433px", width: "247px" }
  ];

  return (
    <>
      {/* TOP DIVIDER */}
      <div 
        className="h-[40px] lg:h-[60px] bg-black lg:bg-[linear-gradient(to_right,black_50%,#F97028_50%)]"
      >
      </div>
      
      {/* Main Content Area */}
      <div 
        className="bg-black flex flex-col lg:flex-row font-heading-bold relative pl-0 lg:pl-[67px] text-center lg:text-left" 
        style={{ zIndex: 1 }}
      >
        
        {/* 'What to Expect' Text Block */}
        <div 
          className="text-white py-6 px-4 lg:px-11 lg:py-[118px] box-border flex justify-center items-center"
        >
          <div 
            className="font-heading-bold flex justify-center items-center h-auto w-full lg:h-[272px] lg:w-[122px]"
          >
            <h2
              className="text-[40px] lg:text-[67.9111px] leading-[0.95] lg:leading-[0.9] whitespace-nowrap"
              style={{
                writingMode: isLargeScreen ? 'vertical-rl' : 'initial', 
                textAlign: 'center',
                transform: isLargeScreen ? 'rotate(180deg)' : 'none',
              }}
            >
              What to <br className="" /> Expect
            </h2>
          </div>
        </div>

        <div className="pl-[68px] hidden lg:block"></div> 

        {/* Bars Container */}
        <div 
          className="flex flex-col relative w-full lg:w-auto" 
          style={{ zIndex: 10 }}
        >
          {bars.map((bar, index) => (
            <div
              key={index}
              ref={el => {barsRef.current[index] = el}}
              style={{
                height: isLargeScreen ? '102px' : '70px',
                width: isLargeScreen ? '1200px' : '100%',
                paddingTop: isLargeScreen ? '30px' : '20px',
                paddingLeft: isLargeScreen ? bar.px : '16px',
                backgroundColor: bar.color,
                borderTop: index > 0 ? '1.6px solid black' : 'none',
                borderBottom: index < bars.length - 1 ? (isLargeScreen ? '7px' : '5px') + ` solid ${bar.border}` : 'none',
                borderTopLeftRadius: !isLargeScreen && index === 0 ? '20px' : '0',
                borderTopRightRadius: !isLargeScreen && index === 0 ? '20px' : '0',
                zIndex: 10,
                cursor: 'pointer',
                position: 'relative'
              }}
              className="flex items-center"
            >
              <div 
                style={{
                  height: isLargeScreen ? '46px' : 'auto',
                  fontSize: isLargeScreen ? '50.9333px' : '28px',
                  lineHeight: isLargeScreen ? '45.84px' : 'auto',
                  width: isLargeScreen ? bar.width : 'auto',
                  whiteSpace: 'nowrap',
                  color: '#FFFEFB',
                  margin: isLargeScreen ? '0' : 'auto'
                }}
              >
                {bar.title}
              </div>
              
              {/* Image (Hidden on Mobile/Tablet) */}
              {isLargeScreen && (
                <div
                  ref={el => {imagesRef.current[index] = el}}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    [bar.side]: '50px',
                    transform: 'translateY(-50%)',
                    width: '293.9px',
                    height: '345.325px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1.6px solid #1a1a1a',
                    pointerEvents: 'none',
                    zIndex: 100001
                  }}
                >
                  <img 
                    src={bar.img}
                    alt={bar.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* BOTTOM DIVIDER */}
      <div 
        className="h-[40px] lg:h-[60px] bg-[#F97028] lg:bg-[linear-gradient(to_right,black_50%,#F97028_50%)]"
      >
      </div>
    </>
  );
}

export default WTE;