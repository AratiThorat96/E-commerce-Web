import React, { useState, useEffect } from 'react';
import Background from '../component/Background';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';


function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that Speaks." },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Exclusive Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // NOTE: Transition duration in Background.jsx is 700ms.
  const TRANSITION_DURATION = 700;

  // Auto-slide functionality with transition management
  useEffect(() => {
    const slideInterval = setInterval(() => {
      // 1. Start transition (fade out Hero content)
      setIsTransitioning(true);
      
      // 2. Wait for the transition duration
      setTimeout(() => {
        // 3. Update the data/background and end transition
        setHeroCount((prev) => (prev + 1) % heroData.length);
        setIsTransitioning(false); 
      }, TRANSITION_DURATION); // Match to Background.jsx CSS duration: 700ms

    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(slideInterval);
  }, [heroData.length]);

  return (
    <div>
    <div className='w-full h-screen relative flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-slate-800 to-black'>
      {/* Passing isTransitioning is not needed for Background, but included for completeness */}
      <Background heroCount={heroCount} /> 
      <Hero 
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        isTransitioning={isTransitioning}
      />

    </div>
    <Product />
    <OurPolicy />
    <NewLetterBox />
  <Footer />
    </div>
  );
}

export default Home;