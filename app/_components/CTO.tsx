import React from 'react'

function CTO() {
  return (
    <div className='mt-[170px] px-[67px] '>
      {/* Content layer with SVG inside */}
      <div className='h-[659px] rounded-[4.5em] border-[1.6px] border-black bg-[#F489A3] relative overflow-hidden shadow-[0px_10px_0px_0px_#000] shadow-[#CFC9B3]'>
        {/* Left SVG - bottom left */}
        <img 
          src="/svg/left.svg" 
          alt="Background decoration"
          className="absolute top-[141px] left-[-92px] h-full w-auto object-contain z-0"
        />
        
        {/* Right SVG - top right corner, flipped and mirrored */}
        <img 
          src="/svg/left.svg" 
          alt="Background decoration"
          className="absolute top-[-136px] right-[-107px] h-full w-auto object-contain z-0 scale-x-[-1] scale-y-[-1]"
        />
        
        <div className='px-[373px] pt-[186px] relative z-10'>
          <div className='h-[186px] w-[645px] font-heading-bold text-[68.9742px] pb-[42px] leading-[62.075px] text-center'>
            Get Your Ticket for the Community-Led Event of the Year
          </div>
        
          <div className='text-[16.9778px] text-center leading-[22.0711px] pt-[42px] font-quicksand'>
            As web designers and developers, this is the kind of event we desperately needed, so we created it. No stuffy conference rooms, no dull corporate halls, just a lovely community sharing knowledge with a pint and a burger in hand.
          </div>

          <div className='pt-[42px] items-center justify-center flex'>
            <button
              className="
                cursor-pointer
                flex items-center justify-center
                border-2 border-[#121212]
                rounded-[170.667px]
                w-[138.5px] h-[46.925px]
                px-[21.3333px] py-[1.70667px]
                text-[#121212] text-[17.0667px] font-normal leading-[17.0667px]
                bg-[white]
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
        </div>
      </div>
    </div>
  )
}

export default CTO