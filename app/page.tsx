/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useState, useEffect } from 'react'
import StripesHome from './_components/HeroTwinStrips'
import WTE from './_components/WTE'
import Community from './_components/Community'
import Testimonial from './_components/Testimonial'
import FAQ from './_components/FAQ'
import CTO from './_components/CTO'
import Footer from './_components/Footer'
import Team from './_components/Team'
import About from './_components/About' 
import SunPage from './_components/Sun'


function App() {
  const [navVisible, setNavVisible] = useState(false)
  const [preloaderComplete, setPreloaderComplete] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false) 

  useEffect(() => {
    if (preloaderComplete && !isPopupOpen) { 
      const timer = setTimeout(() => {
        setNavVisible(true)
      }, 300)

      return () => clearTimeout(timer)
    } 
    else if (isPopupOpen) {
      setNavVisible(false)
    }
    
  }, [preloaderComplete, isPopupOpen]) 

  const isNavbarVisible = navVisible && !isPopupOpen

  return (
    <div>
      <nav
        className={`
          sticky top-0 left-0 w-full bg-[#f3ecd2] text-black text-[17.0667px] z-[5000] 
          px-[68.2667px] h-[78.925px] flex border-b-2 border-black
          transition-transform duration-700 ease-out
          ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'} 
        `}
      >
        <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">
          
        
          <ul className="flex gap-[29.8667px] flex-1 list-none p-0 m-0 cursor-pointer">
            <li className="nav-bar__li">
              <div className="nav-link font-medium">About</div>
            </li>
            <li className="nav-bar__li">
              <div className="nav-link font-medium">Speakers</div>
            </li>
            <li className="nav-bar__li">
              <div className="nav-link font-medium">Activities</div>
            </li>
          </ul>

          <div
            className="flex justify-center flex-1 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="Logo"
              width={195.74}
              height={33.76}
              className="pointer-events-none"
            />
          </div>

          <div className="flex justify-end flex-1 cursor-pointer">
            <button
              className="
                cursor-pointer flex items-center justify-center
                border-2 border-[#121212]
                rounded-[170.667px]
                w-[138.5px] h-[46.925px]
                px-[21.3333px] py-[1.70667px]
                text-[#121212] text-[17.0667px] font-normal leading-[17.0667px]
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
        </div>
      </nav>
      <SunPage svgSrc="/svg/sun.svg" />

      <StripesHome onPreloaderComplete={() => setPreloaderComplete(true)} />
      <About onPopupChange={setIsPopupOpen} />
      
      <Team /> 
      <WTE />
      <Community/> 
      
      <Testimonial />
      <FAQ/>
      <CTO/> 
      <Footer/>
  
    </div>
  )
}

export default App