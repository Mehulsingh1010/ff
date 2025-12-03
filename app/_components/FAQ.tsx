/* eslint-disable react/no-unescaped-entities */
'use client'
import { div } from 'framer-motion/client';
import React, { useState } from 'react';

// Use this updated SVG definition
const PlusIcon = ({ rotation }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" // Fixed size for better control
    height="18" // Fixed size for better control
    viewBox="0 0 18 18" 
    fill="none" 
    style={{
      // Apply rotation transform
      transform: rotation,
      // Use the fast twist transition
      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.6, 1)',
      // Darken the color slightly by using a thick stroke
      stroke: 'black', 
    }}
  >
    {/* Horizontal line */}
    <path 
      d="M1.05469 9.40723H16.0547" 
      strokeWidth="0.12em" // Slightly thicker stroke for darkening
      strokeLinecap="round" 
      vectorEffect="non-scaling-stroke"
    />
    {/* Vertical line */}
    <path 
      d="M8.55176 1.90723L8.55176 16.9072" 
      strokeWidth="0.12em" // Slightly thicker stroke for darkening
      strokeLinecap="round" 
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);


function AccordionItem({ question, isOpen, onClick, children, contentHeight = 220 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Adjusted for faster, "twist" effect: 0.2s duration and a sharper timing function
  const twistTransition = '0.2s cubic-bezier(0.4, 0, 0.6, 1)'; 

  // Use the twist transition for all opening/closing elements
  const accordionTransition = `min-height ${twistTransition}`;
  const heightTransition = `height ${twistTransition}`;
  const allPropertiesTransition = `all ${twistTransition}`;

  // Calculate total height based on content height
  const totalOpenHeight = contentHeight + 102; // 102px accounts for top elements + button
  const expandingPaperHeight = contentHeight + 10; // 10px for padding adjustments

  let plusRotation = 'rotate(0deg)'; // Default: Closed, Not Hovered (+)
  
  if (isOpen) {
    // Open State (Cross 'x')
    plusRotation = 'rotate(45deg)'; 
    if (isButtonHovered) {
      // Open AND Hovered (Rotate the 'x' 90 degrees)
      plusRotation = 'rotate(135deg)'; // 45deg (x) + 90deg (twist) = 135deg
    }
  } else if (isHovered) {
    // Closed AND Hovered (Twist to 90 degrees)
    plusRotation = 'rotate(90deg)'; 
  }

  return (
    <div 
      className="mt-[16px] overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: isOpen ? `${totalOpenHeight}px` : '92px',
        transition: accordionTransition,
      }}
    >
      <div className="relative" style={{
        height: isOpen ? `${totalOpenHeight}px` : '92px',
        transition: heightTransition,
      }}>
        {/* Top connector bar */}
        <div 
          className="absolute bg-[#F3A20F] scale-z-100"
          style={{
            height: isOpen ? '18px' : '20px',
            width: isOpen ? '130px' : '130px',
            top: isOpen ? '22.2px' : '14.2px',
            left: isOpen ? '0px' : '0px',
            borderLeft: isOpen ? '2.5px solid #000' : '2.5px solid #000',
            transition: allPropertiesTransition,
          }}
        />
        
        {/* Top small rectangle */}
        <div 
          className="bg-[#F3A20F] rounded-md border-[2.5px] w-[130px]"
          style={{
            height: isOpen ? '30px' : '42px',
            marginBottom: isOpen ? '-10px' : '-30px',
            borderRadius: isOpen ? '8px' : '6px',
            transition: allPropertiesTransition,
          }}
        />
        
        {/* Side connector - always visible */}
        <div 
          className="ml-[130px] z-[-1] rounded-tr-lg bg-[#F3A20F] border-t-[2.5px] border-r-[2.5px]"
          style={{
            height: '26px',
            marginBottom: '-6px',
          }}
        />
        
        {/* Expanding paper content */}
        <div 
          className="bg-[#F3A20F] border-l-[2.5px] border-r-[2.5px] overflow-hidden"
          style={{
            height: isOpen ? `${expandingPaperHeight}px` : '0px',
            marginBottom: '-10px',
            paddingLeft: isOpen ? '23px' : '0px',
            paddingRight: isOpen ? '23px' : '0px',
            paddingTop: isOpen ? '8.48889px' : '0px',
            opacity: isOpen ? 1 : 0,
            transition: allPropertiesTransition,
          }}
        >
          <div 
  className="bg-white border-[1.6px] rounded-t-[18px] px-[16.9778px] pt-[16.9778px] overflow-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]" 
  style={{ 
    height: `${contentHeight}px`,
    transform: isOpen 
      ? (isButtonHovered ? 'rotate(-1deg) translateY(5px)' : 'rotate(-1deg)')
      : 'rotate(0deg)',
    transition: `transform 0.2s cubic-bezier(0.4, 0, 0.6, 1) 0.1s `,
  }}
>
  {children}
</div>
        </div>
        
        {/* Main button */}
        <div 
          className="relative h-[71px] w-[647px] bg-[#F3A20F] border-[1.6px] rounded-lg pl-[25px] pr-[16px] py-[16px] text-[16.9778px] flex items-center justify-between cursor-pointer overflow-visible"
          onClick={onClick}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          style={{ zIndex: 20 }}
        >
          
                  <div
  className="
    absolute left-[25px] right-[16px] bg-white rounded-t-lg
    border-t-[1.6px] border-r-[1.6px] border-l-[1.6px]
  "
  style={{
    bottom: '67.2px',
    height: !isOpen && isHovered ? '7px' : '0px',
    opacity: 1,
    zIndex: -0,
    transition: `height ${twistTransition}`,
    borderBottom: !isOpen && isHovered ? '1.6px solid black' : 'none',
  }}
/>


          
          <span>{question}</span>
          <div className="pr-[9px] flex items-center justify-center">
            {/* Replace the <span> with the new PlusIcon component */}
            <PlusIcon rotation={plusRotation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionData = [
    {
      question: "Can I have a discount?",
      contentHeight: 220,
      content: (
      <div>
  <p className='text-[14.8556px] leading-[22.2833px] font-quicksand w-[559.2px]'>
    This is a <span className="font-bold">non-profit</span> event, and our goal is to make FlowFest as 
    <span className="font-bold"> affordable</span> as we possibly can whilst delivering a 
    <span className="font-bold"> quality</span> day that you'll never forget. Due to last year's feedback we are 
    investing more in <span className="font-bold">comfort</span> and 
    <span className="font-bold"> quality</span> this year.
  </p>

  <p className='text-[14.8556px] pt-[10px] pb-[10px] leading-[22.2833px] font-quicksand w-[559.2px]'>
    To keep ticket prices as <span className="font-bold">low</span> as we can for 
    <span className="font-bold"> everyone</span>, we are 
    <span className="font-bold"> unable</span> to offer discounts and appreciate your 
    <span className="font-bold"> support</span> for this community event.
  </p>

  <button
    className="
      cursor-pointer flex items-center justify-center
      border-2 border-[#121212]
      rounded-[170.667px]
      w-[138.5px] h-[46.925px]
      px-[21.3333px] py-[1.70667px]
      text-[#12112] text-[17.0667px] font-normal leading-[17.0667px]
      bg-[#f489a3]
      whitespace-nowrap
      shadow-[0px_4.26667px_0px_0px_rgba(0,0,0,0.15)]
      transition-all duration-200 ease-out
      hover:translate-y-[4.26667px] hover:shadow-none
      active:translate-y-[4.26667px] active:shadow-none
    "
  >
    Buy Tickets
  </button>
</div>

      )
    },
    {
      question: "How do I get there?",
      contentHeight: 160,
      content: (
           <div>
  <p className='text-[14.8556px] leading-[22.2833px] font-quicksand w-[559.2px]'>
    FlowFest is hosted in <span className="font-bold">Media City Gardens</span>
    (you'll find it by searching the Blue Peter Garden on Google Maps), which is an
    <span className="font-bold"> outdoor</span> venue. It's directly in front of Media City
    <span className="font-bold"> tram</span> stop, which is a great way to get to the venue if
    you're travelling from the city centre or other parts of Manchester. There is also a
    <span className="font-bold"> multi-story car park</span> just round the corner for those driving.
  </p>
</div>



      )
    },
    {
      question: "Is there food included?",
      contentHeight: 100,
      content: (
        <div>
  <p className='text-[14.8556px] leading-[22.2833px] font-quicksand w-[559.2px]'>
    Yes, a banging <span className='font-bold'>lunch</span> courtesy of Kargo on the Docks is <span className='font-bold'>included</span> in your ticket, as well as <span className='font-bold'>drinks</span> tokens.
  </p>
</div>
      )
    },
    {
      question: "What should I bring?",
      contentHeight: 140,
      content: (
       <div>
  <p className='text-[14.8556px] leading-[22.2833px] font-quicksand w-[559.2px]'>
    Good vibes and <span className="font-bold">layers</span>.
    This is an all day <span className="font-bold">outdoor</span> event in
    <span className="font-bold"> Manchester</span>, so check the weather closer to the time
    and <span className="font-bold">dress accordingly</span>. Also, we've taken your
    feedback onboard and there are no hands on workshops, so
    <span className="font-bold"> no need</span> to bring a <span className="font-bold">laptop</span>.
  </p>
</div>


      )
    },
    {
      question: "Will there be an afterparty?",
      contentHeight: 160,
      content: (
        <div >
<p className='text-[14.8556px] leading-[22.2833px] font-quicksand w-[559.2px] '>
  As it was last year, there isn't an <span className="font-bold">official</span> or planned afterparty, but FlowFest 
  folks know the party <span className="font-bold">never stops</span>. We usually have the venue until 6 or 7pm, and 
  last year we headed to Kargo Food Market to get some <span className="font-bold">dinner</span> and headed into town 
  for <span className="font-bold">karaoke</span>. After party <span className="font-bold">planners</span> welcome, 
  FlowFest is on a Friday after all so it would be rude not to get a bit <span className="font-bold">lairy</span>.
</p>
        </div>
     
         
      )
    }
  ];

  return (
    <div className="mt-[10px] px-[67px] text-black">
      <div className="px-[450px] pb-[67px]">
        <div className="h-[137px] font-heading-bold text-black text-[68.9722px] text-nowrap leading-[62.075px]">
          Frequently Asked
          <div className="text-center mx-auto rotate-[2deg] shadow-[#CFC9B3] shadow-[0px_6px_0px_0px_#000] text-white bg-[#F97028] w-[288.66px] border-2 border-black rounded-md text-[62.075px] leading-[55.8675px] pt-[9.31125px] pb-[3.10375px] px-[15.5188px]">
            Questions
          </div>
        </div>
      </div>
      <div className="px-[96px] flex">
        <div className="h-[541px] w-[485px] rounded-[50px] border-[1.6px] overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/682310547ba9eeb97324a89e/682dc19153bdaa746c0b423a_event-image-7.avif"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-[69px]">
  {accordionData.map((item, index) => (
    <div
      key={index}
      className="bg-[#EFEEEC] mb-[12px] rounded-t-lg"
    >
      <AccordionItem
        question={item.question}
        isOpen={openIndex === index}
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
        contentHeight={item.contentHeight}
      >
        {item.content}
      </AccordionItem>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}