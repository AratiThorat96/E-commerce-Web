import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpayImage from "../assets/razorpay.png"; // Renamed to avoid confusion with the library
import { ShopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  let navigate  = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(ShopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const totalAmount = getCartAmount() + delivery_fee;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

 const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

 // PlaceOrder.jsx (Only the initPay function is shown)

  // ✅ Proper Razorpay Payment Initialization
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Secure Payment",
      order_id: order.orderId, 
      handler: async (response) => {
        
        console.log(response); // Keep this line to see payment details

        try {
          const verifyResponse = await axios.post(
            `${serverUrl}/api/order/verifyrazorpay`,
            {
              razorpay_order_id: response.razorpay_order_id, 
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              // FIX 1: PASS THE MongoDB ORDER ID TO THE BACKEND
              dbOrderId: order.dbOrderId // <-- This is the MongoDB Order ID
            },
            { withCredentials: true }
          );
          
          // Check for the success property added in the backend fix
          if (verifyResponse.data.success) {
            toast.success("Payment successful!");
            setCartItem({});
            navigate("/order");
          } else {
            toast.error(verifyResponse.data.message || "Payment verification failed"); 
          }
        } catch (err) {
          console.error("Error verifying payment:", err);
          toast.error("Error verifying payment on server");
        }
      },
      theme: { color: "#3bcee8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const createOrderItems = () => {
    const orderItems = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          const product = structuredClone(
            products.find((p) => p._id === productId)
          );
          if (product) {
            product.size = size;
            product.quantity = cartItem[productId][size];
            orderItems.push(product);
          }
        }
      }
    }
    return orderItems;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const orderItems = createOrderItems();
    // Validate required fields (optional, but recommended)
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    if (orderItems.length === 0 || !isFormValid) {
        toast.error("Cart is empty or delivery form is incomplete.");
        return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: totalAmount,
      paymentMethod: method,
    };

    if (method === "cod") {
      try {
        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true }
        );
        if (result.data.orderId) {
          toast.success("Order placed successfully (COD)!");
          setCartItem({});
          navigate("/order");
        } else {
          // This should ideally be caught in the catch block if status is not 2xx
          toast.error("Failed to place COD order"); 
        }
      } catch (error) {
        console.log("COD Order Error:", error);
        toast.error("Failed to place order");
      }
    } else if (method === "razorpay") {
      try {
        // ✅ Create Razorpay order from backend
        const result = await axios.post(
          `${serverUrl}/api/order/razorpay`,
          orderData,
          { withCredentials: true }
        );
        if (result.data && result.data.orderId) {
          initPay(result.data);
        } else {
            toast.error("Failed to get Razorpay order details from server");
        }
      } catch (error) {
        console.error("Razorpay Order Initiation Error:", error);
        toast.error(error.response?.data?.message || "Failed to initiate Razorpay order");
      }
    }
  };

  return (
    // FIX: Changed w-[99vw] to w-full and added lg:p-12 for better spacing on large screens
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start justify-center gap-12 relative p-4 lg:p-12 mx-auto">
      {/* Delivery Form */}
      {/* FIX: Changed lg:w-[50%] to lg:w-1/2 and w-[100%] to w-full */}
      <div className="lg:w-1/2 w-full flex items-center justify-center mt-20 lg:mt-0">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[90%] w-full flex flex-col gap-4 max-w-xl" // Added max-w-xl for better form width control
        >
          <Title text1="DELIVERY" text2="INFORMATION" />

          {/* First & Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            // FIX: Replaced h-[50px] with h-12
            className="w-full h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
            required
          />

          {/* Street */}
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            // FIX: Replaced h-[50px] with h-12
            className="w-full h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
            required
          />

          {/* City & State */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
          </div>

          {/* Pincode & Country */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Pincode"
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              // FIX: Replaced h-[50px] with h-12
              className="w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
              required
            />
          </div>

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            // FIX: Replaced h-[50px] with h-12
            className="w-full h-12 rounded-md bg-slate-700 text-white px-4 shadow-sm shadow-[#343434] focus:outline-none focus:ring-2 focus:ring-[#3bcee8]"
            required
          />

          <button
            type="submit"
            className="mt-4 py-3 px-6 rounded-2xl bg-[#3bcee848] text-white font-bold shadow-sm shadow-[#343434] hover:bg-[#3bcee8aa]"
          >
            {method === 'cod' ? 'PLACE ORDER (COD)' : 'PROCEED TO RAZORPAY'}
          </button>
        </form>
      </div>

      {/* Cart & Payment */}
      {/* FIX: Changed lg:w-[50%] to lg:w-1/2 and w-[100%] to w-full */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center gap-6 pb-20 lg:pb-0">
        <CartTotal totalAmount={totalAmount} />
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="flex gap-6 mt-4 justify-center">
          <button
            onClick={() => setMethod("razorpay")}
            // FIX: Replaced w-[150px] h-[50px] with w-36 h-12
            className={`w-36 h-12 rounded-sm transition duration-150 ease-in-out ${
              method === "razorpay" ? "border-4 border-blue-900 ring-2 ring-blue-500" : "opacity-70"
            }`}
          >
            <img
              src={razorpayImage} // Use renamed variable
              className="w-full h-full object-cover rounded-sm"
              alt="Razorpay"
            />
          </button>
          <button
            onClick={() => setMethod("cod")}
            // FIX: Replaced w-[200px] h-[50px] with w-48 h-12
            className={`w-48 h-12 rounded-sm bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f] font-bold transition duration-150 ease-in-out hover:shadow-lg ${
              method === "cod" ? "border-4 border-blue-900 ring-2 ring-blue-500" : "opacity-70"
            }`}
          >
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;