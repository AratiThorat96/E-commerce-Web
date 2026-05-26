/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { ShopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';
import toast from 'react-hot-toast';
import Loading from '../component/Loading';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);
  const [loading , setLoading] =useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    setLoading(true);
  
    const tempData = [];

    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }

   

    setCartData(tempData);
    setLoading(false);
  }, [cartItem]);

  return (
    <div className="w-full min-h-[100vh] p-[20px] pb-[140px] md:pb-[40px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* Page Title */}
      <div className="text-center mt-[80px] mb-[30px]">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="w-full flex flex-col gap-[20px]">
        {cartData.length === 0 ? (
          <p className="text-center text-[#d7f3f1] text-[20px]">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="w-full flex items-center justify-between bg-[#51808048] p-4 rounded-xl border border-[#8cdad1]"
              >
                {/* Product Image + Info */}
                <div className="flex items-center gap-6 w-full relative">
                  <img
                    className="w-[100px] h-[100px] object-cover rounded-md border border-[#9ff9f9]"
                    src={productData.image1}
                    alt={productData.name}
                  />

                  <div className="flex flex-col gap-2 flex-grow">
                    <p className="text-[22px] text-[#f3f9fc] font-semibold">{productData.name}</p>

                    <div className="flex items-center gap-5 flex-wrap">
                      <p className="text-[18px] text-[#aaf4e7]">
                        {currency} {productData.price}
                      </p>

                      <p className="text-[16px] text-white bg-[#518080b4] rounded-md px-3 py-1 border border-[#9ff9f9]">
                        Size: {item.size}
                      </p>

                      {/* ✅ Quantity Input - Centered Inside Box */}
                      <div className="flex items-center justify-center">
                       <input
  type="number"
  min={1}
  value={item.quantity}
  onChange={(e) => {
    const val = Number(e.target.value);
    if (!val || val < 1) return;
    updateQuantity(item._id, item.size, val);
  }}
  className=' md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px]border-[#9ff9f9] rounded-md ' 
/>

                        
                      </div>
                    </div>
                  </div>

                  {/* 🗑 Delete Button - Vertically Centered */}
                  <RiDeleteBin6Line
                    className="text-[#9ff9f9] w-[30px] h-[30px] hover:text-[#ff6b6b] cursor-pointer transition-all duration-200 absolute top-1/2 right-3 transform -translate-y-1/2"
                    onClick={() => {
                      if (window.confirm('Remove this item from your cart?')) {
                        updateQuantity(item._id, item.size, 0);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button type="button" className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]' onClick={()=>{
            if(cartData.length >0){
              navigate("/placeorder");
            }else{
              toast.error("Your Cart is empty!");
            }
          }}>{loading ? <Loading/> : "PROCEED TO CHECKOUT"}</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
