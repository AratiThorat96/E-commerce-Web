/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import { authDataContext } from './authContext';
import { userDataContext } from './UserContext';

export const ShopDataContext = createContext();

function ShopContext({ children }) {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { userData } = useContext(userDataContext);
    const [showSearch, setShowSearch] = useState(false);
    const { serverUrl } = useContext(authDataContext);
    const [cartItem, setCartItem] = useState({});
    
    const currency = '₹';
    const delivery_fee = 40;

    // Fetch all products
    const getProducts = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/product/list`);
            setProducts(result.data);
        } catch (error) {
            console.log("getProducts error:", error);
            toast.error("Failed to fetch products");
        }
    };

    // Add item to cart
    const addtoCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select product size");
            return;
        }

        const cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(`${serverUrl}/api/cart/add`, { itemId, size }, { withCredentials: true });
                toast.success("Added to cart");
            } catch (error) {
                console.log("addtoCart error:", error);
                toast.error("Failed to add to cart");
            }
        }
    };

    // Get user's cart from backend
    const getUserCart = async () => {
        if (!userData) return; // Only fetch if user is logged in

        try {
            const result = await axios.get(`${serverUrl}/api/cart/get`, { withCredentials: true });
            setCartItem(result.data);
        } catch (error) {
            console.log("getUserCart error:", error);
            toast.error("Failed to fetch cart");
        }
    };
     
     const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem); // clone current cart

    if (!cartData[itemId]) cartData[itemId] = {}; // safeguard
    cartData[itemId][size] = quantity; // update quantity
    setCartItem(cartData); // update state immediately

    if (userData) {
        try {
            await axios.post(
                `${serverUrl}/api/cart/update`,
                { itemId, size, quantity },
                { withCredentials: true }
            );
            toast.success("Cart updated");
        } catch (error) {
            console.log("updateQuantity error:", error);
            toast.error("Failed to update cart");
        }
    }
};


    // Calculate total cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) totalCount += cartItem[items][item];
            }
        }
        return totalCount;
    };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItem) {
        const itemInfo = products.find((product) => product._id === items);
        if (!itemInfo) continue; // skip if product not found

        for (const size in cartItem[items]) {
            const quantity = cartItem[items][size];
            if (quantity > 0) {
                totalAmount += itemInfo.price * quantity;
            }
        }
    }

    return totalAmount;
};


    // Fetch products once on mount
    useEffect(() => {
        getProducts();
    }, []);

    // Fetch cart whenever userData changes (after login)
    useEffect(() => {
        getUserCart();
    }, [userData]);

    const value = {
        products,
        currency,
        delivery_fee,
        getProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addtoCart,
        getCartCount,
        setCartItem,
        updateQuantity,
        getCartAmount
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext;
