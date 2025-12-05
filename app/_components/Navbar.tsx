import React from "react";

const Navbar = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <nav
    ref={ref}
    className="fixed top-0 left-0 w-full bg-[#f3ecd2] text-black text-[17.0667px] h-[61px] md:h-[68px] lg:h-[78.925px] px-[13px] z-[5000]  md:px-[44px] lg:px-[68.2667px]  flex border-b-2 border-black"
    style={{ transform: "translateY(-100%)" }}
  >
    <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">
      <div className="hidden md:hidden lg:flex flex-1">
        <ul className="flex gap-[29.8667px] list-none p-0 m-0 cursor-pointer">
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
      </div>

      {/* 2. Logo */}
      <div
        className="
          flex justify-center flex-1 md:flex-none
          cursor-pointer select-none 
          mx-auto h-[29px] md:w-[169px] lg:h-[34px] lg:w-[195px]
        "
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src="/logo.png"
          alt="Logo"
          width={195}
          height={34}
          className="pointer-events-none"
        />
      </div>

      {/* 3. Buy Tickets Button (Always Visible, aligned right) */}
      <div
        className="
          flex justify-end flex-1 
          cursor-pointer 
          md:ml-auto 
        "
      >
        <button className="cursor-pointer flex items-center justify-center border-2 border-[#121212] rounded-[170.667px] h-[36px] md:h-[41px] lg:h-[46.925px] md:w-[119.988px] lg:w-[139px]  px-[18px] md:px-[13px] lg:px-[21.3333px] py-[9px]  text-[#121212] text-[13.1282px] md:text-[14.7338px] lg:text-[17.0667px] tracking-[-0.131282px]   font-normal leading-[17.0667px] bg-[#f489a3] whitespace-nowrap lg:shadow-[0px_4.26667px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:translate-y-[4.26667px] hover:shadow-none active:translate-y-[4.26667px] active:shadow-none">
          Buy Tickets
        </button>
      </div>
    </div>
  </nav>
));

Navbar.displayName = "Navbar";

export default Navbar;
