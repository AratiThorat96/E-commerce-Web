// src/component/Nav.jsx - WITH CLICK-OUTSIDE LOGIC ADDED
import React, { useContext, useState, useEffect, useRef } from 'react';
import Logo from '../assets/logo.png';
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { ShopDataContext } from '../context/ShopContext';

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let {showSearch, setShowSearch , search,setSearch,getCartCount} = useContext(ShopDataContext)
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  // --- 💡 ADDED REFS FOR CLICK-OUTSIDE LOGIC ---
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };
  
  // --- 💡 ADDED EFFECT FOR PROFILE DROPDOWN CLOSURE ---
  useEffect(() => {
    function handleClickOutside(event) {
      // Close profile dropdown if click is outside the dropdown and its button
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  // --- 💡 ADDED EFFECT FOR MOBILE SEARCH CLOSURE ---
  useEffect(() => {
    function handleClickOutsideSearch(event) {
      // Close search bar if click is outside the search area and its icon
      if (searchRef.current && !searchRef.current.contains(event.target) && showSearch) {
        // Only close if the click is NOT on the search icon itself
        const searchIconClicked = event.target.closest('.search-toggle-icon');
        if (!searchIconClicked) {
          setShowSearch(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [searchRef, showSearch]);

  const navItems = [
    { name: 'HOME', path: '/', icon: <IoMdHome className='w-[25px] h-[25px]' /> },
    { name: 'COLLECTIONS', path: '/collections', icon: <HiOutlineCollection className='w-[25px] h-[25px]' /> },
    { name: 'ABOUT', path: '/about', icon: <MdContacts className='w-[25px] h-[25px]' /> },
    { name: 'CONTACT', path: '/contact', icon: <MdContacts className='w-[25px] h-[25px]' /> },
  ];
  
  return (
    <div className='w-full h-[70px] bg-[#ecfafaec] z-20 fixed top-0 flex items-center justify-between px-4 md:px-8 shadow-lg shadow-black/10'>
      {/* Left: Logo and Brand Name */}
      <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
        <img src={Logo} alt="Logo" className='w-10 h-10' />
        <span className='font-bold text-xl text-gray-800 hidden sm:block'>OneCart</span>
      </div>

      {/* Center: Desktop Navigation */}
      <div className='w-1/2 hidden md:flex justify-center'>
        <ul className='flex items-center gap-5 text-gray-800 font-medium'>
          {navItems.map((item) => (
            <li 
              key={item.name}
              className='relative cursor-pointer transition-colors duration-300 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:text-orange-500 hover:before:scale-x-100'
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Icons and User Menu */}
      <div className='flex items-center justify-end gap-3 md:gap-5'>
        <div className='relative'>
          {/* Added class 'search-toggle-icon' to identify the icon */}
          {!showSearch ? (
            <IoSearchCircleOutline className='search-toggle-icon w-8 h-8 md:w-9 md:h-9 text-gray-800 cursor-pointer transition-transform duration-300 hover:scale-110' onClick={() => {setShowSearch(prev => !prev);navigate("/collections")}} />
          ) : (
            <IoSearchCircleSharp className='search-toggle-icon w-8 h-8 md:w-9 md:h-9 text-gray-800 cursor-pointer transition-transform duration-300 hover:scale-110' onClick={() => setShowSearch(prev => !prev)} />
          )}
        </div>
          
        {/* --- Profile Icon and Dropdown Container (Referenced by profileRef) --- */}
        <div className='relative' ref={profileRef}>
          {!userData ? (
            <FaUserCircle className="w-7 h-7 md:w-8 md:h-8 text-gray-800 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => setShowProfile(prev => !prev)} />
          ) : (
            <div
              className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer font-bold transition-transform duration-300 hover:scale-110"
              onClick={() => setShowProfile(prev => !prev)}
            >
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {showProfile && (
            <div className='absolute w-[220px] bg-gradient-to-b from-[#1a1a1a] via-[#0e1b1f] to-[#141414] top-full right-0 mt-3 border border-gray-700 rounded-2xl shadow-2xl z-30 transition-all duration-300 origin-top animate-fade-in-down backdrop-blur-md'>
              <ul className='flex flex-col gap-1 p-3 text-gray-200'>
                {!userData && (
                  <li
                    className='cursor-pointer py-2 px-3 rounded-lg hover:bg-[#1f3b45] hover:text-white transition-all duration-200'
                    onClick={() => { navigate("/login"); setShowProfile(false) }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className='cursor-pointer py-2 px-3 rounded-lg hover:bg-[#1f3b45] hover:text-white transition-all duration-200'
                    onClick={() => { handleLogout(); setShowProfile(false) }}
                  >
                    Logout
                  </li>
                )}
                <li
                  className='cursor-pointer py-2 px-3 rounded-lg hover:bg-[#1f3b45] hover:text-white transition-all duration-200'
                  onClick={() => { navigate('/order'); setShowProfile(false) }}
                >
                  Order
                </li>
                <li
                  className='cursor-pointer py-2 px-3 rounded-lg hover:bg-[#1f3b45] hover:text-white transition-all duration-200'
                  onClick={() => { navigate('/about'); setShowProfile(false) }}
                >
                  About
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className='relative hidden md:block'>
          <MdOutlineShoppingCart className='w-8 h-8 text-gray-800 cursor-pointer transition-transform duration-300 hover:scale-110' onClick={() => navigate('/cart')} />
          <p className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-orange-500 text-white rounded-full text-xs font-bold'>
            {getCartCount()}
          </p>
        </div>
      </div>

      {/* --- Mobile Search Bar (Referenced by searchRef) --- */}
      {showSearch && (
        <div ref={searchRef} className='absolute w-full h-[80px] bg-white/95 backdrop-blur-sm top-full left-0 flex items-center justify-center z-10 transition-all duration-300 ease-in-out animate-slide-down'>
          <input 
            type="text" 
            className='w-[80%] md:w-[50%] h-[60%] bg-gray-100 rounded-full px-8 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all'
            placeholder='Search for products...' onChange={(e)=>{setSearch(e.target.value)}} value={search}
          />
        </div>
      )}

      {/* Mobile Navigation */}
      <div className='w-full h-[80px] flex items-center justify-around px-4 text-xs fixed bottom-0 left-0 bg-gray-900 border-t border-gray-700 md:hidden z-20'>
        {navItems.map((item) => (
          <button 
            key={item.name}
            className='flex flex-col items-center justify-center text-white gap-1 transition-colors duration-300 hover:text-orange-500'
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
        <button className='flex flex-col items-center justify-center text-white gap-1 transition-colors duration-300 hover:text-orange-500' onClick={() => navigate('/cart')}>
            <MdOutlineShoppingCart className='w-[25px] h-[25px]' />
            CART
        </button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>{getCartCount()}</p>
      </div>
    </div>
  );
}

export default Nav;