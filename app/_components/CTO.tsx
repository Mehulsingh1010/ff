import React from 'react'

function CTO() {
  return (
    <div className='my-6 md:my-[170px] px-4 md:px-[67px]'>
      {/* Content layer with SVG inside */}
      <div className='h-[605px] md:h-[660px] lg:h-[659px] rounded-[39px] md:rounded-[66px] lg:rounded-[4.5em] border-[1.6px] border-black bg-[#F489A3] relative overflow-hidden shadow-[0px_6.56px_0px_0px_#000] md:shadow-[0px_7.37px_0px_0px_#000] lg:shadow-[0px_10px_0px_0px_#000]'>
        {/* Left SVG - bottom left */}
        <img 
          src="/svg/left.svg" 
          alt="Background decoration"
          className="absolute top-[141px] left-[-92px] h-full w-auto object-contain z-0 hidden lg:block"
        />
        
        {/* Right SVG - top right corner, flipped and mirrored */}
        <img 
          src="/svg/left.svg" 
          alt="Background decoration"
          className="absolute top-[-136px] right-[-107px] h-full w-auto object-contain z-0 scale-x-[-1] scale-y-[-1] hidden lg:block"
        />
        
        <div className='px-4 md:px-12 lg:px-[373px] pt-[131px] md:pt-[177px] lg:pt-[186px] relative z-10 flex flex-col items-center justify-center'>
          <div className='font-heading-bold text-[42.67px] md:text-[59.86px] lg:text-[68.97px] pb-0 md:pb-0 lg:pb-[42px] leading-[38.4px] md:leading-[53.87px] lg:leading-[62.08px] text-center w-full md:w-[588px] lg:w-[645px]'>
            Get Your Ticket for the Community-Led Event of the Year
          </div>
        
          <div className='text-[13.13px] md:text-[14.73px] lg:text-[16.98px] text-center leading-[17.07px] md:leading-[19.15px] lg:leading-[22.07px] pt-0 md:pt-0 lg:pt-[42px] font-quicksand w-full md:w-[588px] lg:w-auto'>
            As web designers and developers, this is the kind of event we desperately needed, so we created it. No stuffy conference rooms, no dull corporate halls, just a lovely community sharing knowledge with a pint and a burger in hand.
          </div>

          <div className='pt-[19.69px] md:pt-[22.1px] lg:pt-[42px] items-center justify-center flex'>
            <button
              className="
                cursor-pointer
                flex items-center justify-center
                border-2 border-[#121212]
                rounded-[131.28px] md:rounded-[147.34px] lg:rounded-[170.67px]
                w-[129.31px] md:w-[147px] lg:w-[138.5px]
                h-[45.13px] md:h-[50px] lg:h-[46.93px]
                px-[22.97px] md:px-[24px] lg:px-[21.33px]
                py-[1.31px] md:py-[1.5px] lg:py-[1.71px]
                text-[13.13px] md:text-[14.73px] lg:text-[17.07px]
                font-normal
                leading-[13.13px] md:leading-[14.73px] lg:leading-[17.07px]
                text-[#121212]
                bg-white
                whitespace-nowrap
                shadow-[0px_3.28px_0px_0px_rgba(0,0,0,0.15)] md:shadow-[0px_3.68px_0px_0px_rgba(0,0,0,0.15)] lg:shadow-[0px_4.27px_0px_0px_rgba(0,0,0,0.15)]
                transition-all duration-200 ease-out
                hover:translate-y-[3.28px] md:hover:translate-y-[3.68px] lg:hover:translate-y-[4.27px] hover:shadow-none
                active:translate-y-[3.28px] md:active:translate-y-[3.68px] lg:active:translate-y-[4.27px] active:shadow-none
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