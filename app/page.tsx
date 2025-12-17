/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useState, useEffect } from 'react'

import WTE from './_components/WTE'
import Community from './_components/Community'
import Testimonial from './_components/Testimonial'
import FAQ from './_components/FAQ'
import CTO from './_components/CTO'
import Footer from './_components/Footer'
import Team from './_components/Team'
import About from './_components/About' 
import SunPage from './_components/Sun'
import ScrollTriggerStrips from './_components/Shower'
import ScrollTriggerStrips2 from './_components/RotateX'
import StripesHomeMain from './_components/StripesHome'

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
    <div className='overflow-hidden'>
   

      <SunPage svgSrc="/svg/sun.svg" />
      <StripesHomeMain onPreloaderComplete={()=>{setPreloaderComplete(true)}} />
   
      <About onPopupChange={setIsPopupOpen} />
      
      <Team /> 
      <WTE />
      <Community/>  

      
      <Testimonial />
      <FAQ/>
      <CTO/>
    
      <Footer/>

        <>
        {/* <ScrollTriggerStrips/> */}
        {/* <ScrollTriggerStrips2/> */}
        </>

    </div>
  )
}

export default App