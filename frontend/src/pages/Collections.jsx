/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { FaAngleRight, FaChevronDown } from "react-icons/fa6"; // Using FaChevronDown from fa6
import Title from '../component/Title';
import { ShopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
 let [showFilter, setShowFilter] = useState(false);
 let { products, search, showSearch } = useContext(ShopDataContext);
 let [filterproduct, setFilterProduct] = useState([]);
 let [category, setCategory] = useState([]);
 let [subCategory, setSubCategory] = useState([]);
 let [sortType, SetSortType] = useState("relavent"); // Corrected spelling to 'relavent' for consistency

 const toggleCategory = (e) => {
 if (category.includes(e.target.value)) {
 setCategory(prev => prev.filter(item => item !== e.target.value));
 } else {
 setCategory(prev => [...prev, e.target.value]);
 }
 };
 
 const toggleSubCategory = (e) => {
 if (subCategory.includes(e.target.value)) {
 setSubCategory(prev => prev.filter(item => item !== e.target.value));
 } else {
 setSubCategory(prev => [...prev, e.target.value]);
 }
 };

const applyFilter = () => {
 let productCopy = products.slice();

 if (showSearch && search) {
 productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
 }
 if (category.length > 0) {
 productCopy = productCopy.filter(item => category.includes(item.category));
 }
 if (subCategory.length > 0) {
 productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
 }
 setFilterProduct(productCopy);
 };

 const sortProducts = () => {
 let fbCopy = filterproduct.slice();
 switch (sortType) {
 case 'low-high':
 // Using spread operator for safe sort and setting state
 setFilterProduct([...fbCopy.sort((a, b) => (a.price - b.price))]);
 break;

 case 'high-low':
 setFilterProduct([...fbCopy.sort((a, b) => (b.price - a.price))]);
 break;

 default:
 applyFilter();
 break;
 }
 };

 useEffect(() => {
 sortProducts();
 }, [sortType]);

 useEffect(() => {
// Initialize filterProduct when products data loads
applyFilter(); 
 }, [products]); // Run once when products load

useEffect(() => {
 // Apply filters whenever category, subCategory, or search changes
 applyFilter();
 }, [category, subCategory, search, showSearch]);

 return (
 <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] pb-[110px]'>
 
 {/* --- 1. Filter Sidebar (Fixed on Desktop, Collapsible on Mobile) --- */}
<div className={`
w-full md:w-[280px] lg:w-[320px] 
p-5 border-r border-gray-700 text-[#aaf5fa] bg-slate-800 md:bg-transparent 
 md:min-h-screen 
 lg:fixed lg:top-[70px] lg:h-full
 transition-all duration-300 ease-in-out
`}>

 {/* Filter Title/Toggle Button (Visible on all screens) */}
 <p 
 className='text-2xl font-semibold flex gap-2 items-center cursor-pointer mb-4 md:mb-6' 
 onClick={() => setShowFilter(prev => !prev)}
>
FILTERS 
{/* Icons for mobile toggle */}
<span className='md:hidden text-lg'>
 {!showFilter ? <FaAngleRight /> : <FaChevronDown />}
</span>
 </p>
 {/* Filter Content: Hidden on mobile by default, shown when showFilter is true, ALWAYS shown on md and larger */}
 <div className={`${showFilter ? "block" : "hidden"} md:block transition-all duration-300 ease-in-out`}>

{/* CATEGORIES */}
<div className='p-4 mt-4 rounded-lg bg-slate-700/50 backdrop-blur-sm'>
 <p className='text-lg font-medium mb-3 text-gray-100'>CATEGORIES</p>
 <div className='flex flex-col space-y-2'>
 {['Men', 'Women', 'Kids'].map(cat => (
 <label key={cat} className='flex items-center gap-2 text-base text-gray-200 cursor-pointer hover:text-[#aaf5fa]'> 
 <input 
 type="checkbox" 
 value={cat} 
className='w-4 h-4 rounded text-orange-500 bg-gray-900 border-gray-600 focus:ring-orange-500' 
onChange={toggleCategory} 
 />
 {cat}
 </label>
 ))}
 </div>
 </div>

 {/* SUB-CATEGORIES (FIXED ISSUE HERE) */}
 <div className='p-4 mt-6 rounded-lg bg-slate-700/50 backdrop-blur-sm'>
 <p className='text-lg font-medium mb-3 text-gray-100'>SUB-CATEGORIES</p>
 <div className='flex flex-col space-y-2'>
 {['TopWear', 'BottomWear', 'WinterWear'].map(subCat => (
<label key={subCat} className='flex items-center gap-2 text-base text-gray-200 cursor-pointer hover:text-[#aaf5fa]'> 
 <input 
type="checkbox" 
value={subCat} 
className='w-4 h-4 rounded text-orange-500 bg-gray-900 border-gray-600 focus:ring-orange-500' 
 onChange={toggleSubCategory} 
 />
 {subCat}
</label>
 ))}
 </div>
 </div>
 </div> {/* End of Filter Content */}
</div>

 {/* --- 2. Product Grid Content (Pushed on Desktop, Full Width on Mobile) --- */}
<div className='w-full lg:pl-[320px] md:pl-[280px] pt-4 md:pt-0'>

 {/* Title and Sort */}
 <div className='px-5 flex justify-between items-center flex-col sm:flex-row md:px-8'>
 <Title text1={"ALL"} text2={"COLLECTIONS"} />
 <select 
 className='bg-slate-700 border border-gray-600 w-full sm:w-[200px] h-[45px] mt-4 sm:mt-0 px-3 text-white rounded-lg focus:outline-none focus:border-orange-500 transition-colors' 
 onChange={(e) => SetSortType(e.target.value)}
value={sortType} // Controlled component
 >
 <option value="relavent">Sort By: Relevant</option>
 <option value="low-high">Sort By: Price low to high</option>
 <option value="high-low">Sort By: Price high to low</option>
</select>
 </div>
 
 {/* Product Cards */}
<div className='p-5 md:p-8 flex items-start justify-center flex-wrap gap-8'>
 {
 filterproduct.length > 0 ? (
 filterproduct.map((item, index) => (
 <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
 ))
) : (
<p className='text-xl text-gray-400 mt-10'>No products found matching your criteria.</p>
 )
}
 </div>
</div>
</div>
 );
}

export default Collections;