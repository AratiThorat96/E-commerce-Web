// src/component/Hero.jsx - NO CHANGES NEEDED
import React from 'react';
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount, isTransitioning }) {
  const handleDotClick = (index) => {
    setHeroCount(index);
  };

  return (
    <div className='w-full h-1/2 md:w-1/2 md:h-full flex flex-col justify-center items-start pl-[5%] md:pl-[5%] text-white z-10'>
      <div 
        className={`transition-all duration-500 ease-in-out px-4 md:px-0 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white animate-fadeInUp'>
          {heroData.text1}
        </p>
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-teal-300 mt-2 md:mt-4 animate-fadeInUp delay-300'>
          {heroData.text2}
        </p>
      </div>

      <div className='flex items-center justify-center gap-4 mt-8 md:mt-16 ml-4 md:ml-0 transition-all duration-500 ease-in-out'>
        {[0, 1, 2, 3].map((index) => (
          <FaCircle 
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 cursor-pointer transition-all duration-300 ease-in-out ${
              heroCount === index ? "text-orange-400 scale-125" : "text-gray-400 hover:text-white"
            }`} 
            onClick={() => handleDotClick(index)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;