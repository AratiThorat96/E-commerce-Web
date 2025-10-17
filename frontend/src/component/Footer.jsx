import React from 'react';
import logo from "../assets/logo.png"; // Assuming logo.png is the image file

function Footer() {
  return (
    // 1. Main container: Removes rigid height and unnecessary bottom margin.
    // Uses a light blue background for visibility (matching your original attempt: #dbfcfcec).
    <div className='w-full bg-[#dbfcfcec] text-gray-800'> 

      {/* 2. Content Wrapper: Flex container for the three main columns */}
      <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 
                    flex flex-col md:flex-row justify-between items-start md:space-x-8'>

        {/* --- 1. OneCart/Logo Section (w-1/3 on desktop) --- */}
        <div className='w-full md:w-1/3 flex flex-col space-y-3 mb-6 md:mb-0'>
          
          <div className='flex items-center space-x-2 mt-4'>
            <img 
              src={logo} 
              alt="OneCart Logo" 
              className='w-8 h-8 md:w-10 md:h-10'
            />
            <p className='text-xl md:text-2xl font-semibold text-gray-900'>OneCart</p>
          </div>
          
          {/* Detailed description (Desktop only) */}
          <p className='text-sm text-gray-600 hidden md:block'>
            OneCart is your all-in-one online shopping destination, offering top-quality products, 
            unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
          </p>
          
          {/* Short tagline (Mobile only) */}
          <p className='text-base text-gray-700 md:hidden'>Fast. Easy. Reliable. OneCart Shopping</p>
        </div>

        {/* --- 2. COMPANY Links Section (w-1/4 on desktop) --- */}
        <div className='w-1/2 md:w-1/4 flex flex-col space-y-2 mt-4 md:mt-0'>
          <p className='text-lg font-bold uppercase tracking-wider text-gray-900'>COMPANY</p>
          <ul className='space-y-1 text-sm'>
            <li className='cursor-pointer hover:text-blue-600'>Home</li>
            <li className='cursor-pointer hover:text-blue-600'>About Us</li>
            <li className='cursor-pointer hover:text-blue-600'>Delivery</li>
            <li className='cursor-pointer hover:text-blue-600'>Privacy Policy</li>
          </ul>
        </div>

        {/* --- 3. GET IN TOUCH Section (w-1/4 on desktop) --- */}
        <div className='w-1/2 md:w-1/4 flex flex-col space-y-2 mt-4 md:mt-0'>
          <p className='text-lg font-bold uppercase tracking-wider text-gray-900'>GET IN TOUCH</p>
          <ul className='space-y-1 text-sm'>
            <li className='hover:text-blue-600'>+91-9876543210</li>
            <li className='hover:text-blue-600'>contact@onecart.com</li>
            <li className='hover:text-blue-600'>+1-123-456-7890</li>
            <li className='hover:text-blue-600'>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* --- Separator and Copyright Section --- */}
      <div className='w-full border-t border-gray-300'></div>
      <div className='max-w-7xl mx-auto py-3 text-center text-sm text-gray-700'> 
        Copyright 2025@onecart.com - All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;