// components/Navbar.jsx
import React from 'react';

const Navbar = React.forwardRef((props, ref) => (
  <nav
    ref={ref}
    className="fixed top-0 left-0 w-full bg-[#f3ecd2] text-black text-[17.0667px] z-[5000] px-[68.2667px] h-[78.925px] flex border-b-2 border-black"
    style={{ transform: 'translateY(-100%)' }}
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
          className="cursor-pointer flex items-center justify-center border-2 border-[#121212] rounded-[170.667px] w-[138.5px] h-[46.925px] px-[21.3333px] py-[1.70667px] text-[#121212] text-[17.0667px] font-normal leading-[17.0667px] bg-[#f489a3] whitespace-nowrap shadow-[0px_4.26667px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:translate-y-[4.26667px] hover:shadow-none active:translate-y-[4.26667px] active:shadow-none"
        >
          Buy Tickets
        </button>
      </div>
    </div>
  </nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;