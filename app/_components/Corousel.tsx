// Carousel.jsx
import React from "react";

// The Carousel component takes rotation, items, and the two halves of the items array as props
function Carousel({ rotation, items, firstHalf, secondHalf }) {
  // Utility function to render a single item card
  const renderCardContent = (item) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <h3 className="font-semibold text-purple-600 text-sm mb-2">
        {item.name}
      </h3>
      <p className="text-gray-600 text-xs leading-relaxed mb-4 flex-grow">
        {item.desc}
      </p>
      {/* Resized Image Placeholder to h-36 w-36 (144px) */}
      <div className={`w-36 h-36 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mx-auto`}>
        <svg
          className="w-12 h-12 text-white opacity-60"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
        </svg>
      </div>
    </div>
  );

  // Function to render the items in a half-circle path
  const renderHalfCircle = (itemsToRender, side) => {
    return itemsToRender.map((item, index) => {
      // Logic for calculating position on the half-circle
      const angle = (index / itemsToRender.length) * 180;
      const radius = 280;
      // 'left' items are on 0-180 deg, 'right' items are on 180-360 deg
      const adjustedAngle = side === 'left' ? angle : angle + 180;

      // Convert polar to cartesian coordinates, offset by -90 degrees to start at the top
      const x = Math.cos((adjustedAngle - 90) * (Math.PI / 180)) * radius;
      const y = Math.sin((adjustedAngle - 90) * (Math.PI / 180)) * radius;

      return (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            // Apply translation for placement on the circle, and negative rotation for a fixed-card look
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-rotation}deg)`,
            width: '200px' // Card width
          }}
        >
          {renderCardContent(item)}
        </div>
      );
    });
  };

  return (
    <div className="relative w-full h-96 flex mt-[40px] pb-[40px] overflow-hidden" style={{ gap: '1000px' }}>
      {/* LEFT SIDE Carousel */}
      <div className="relative flex-1 h-full bg-pink-50" style={{ perspective: '1000px' }}> {/* Pink div for left */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-2/3 h-2/3 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 opacity-25 shadow-lg"></div>
          <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 opacity-50 shadow-md"></div>
        </div>

        {/* Frame Effect - Left */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none"></div>

        <div className="absolute inset-0" style={{ transform: `rotate(${rotation}deg)` }}>
          {/* Renders the second half of the items on the left side (0 to 180 degrees) */}
          {renderHalfCircle(secondHalf, 'left')}
        </div>
      </div>

      {/* RIGHT SIDE Carousel */}
      <div className="relative flex-1 h-full bg-pink-50" style={{ perspective: '1000px' }}> {/* Pink div for right */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-2/3 h-2/3 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 opacity-25 shadow-lg"></div>
          <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 opacity-50 shadow-md"></div>
        </div>

        {/* Frame Effect - Right */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none"></div>

        <div className="absolute inset-0" style={{ transform: `rotate(${rotation}deg)` }}>
          {/* Renders the first half of the items on the right side (180 to 360 degrees) */}
          {renderHalfCircle(firstHalf, 'right')}
        </div>
      </div>
    </div>
  );
}

export default Carousel;