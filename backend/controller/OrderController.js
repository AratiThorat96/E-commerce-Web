import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from 'razorpay' // Corrected capitalization for conventiond
// import crypto from 'crypto' // Uncomment this if you implement signature verification

// --- Configuration Setup ---
const currency = 'inr'

/**
 * Initializes the Razorpay client and checks for required environment variables.
 * @returns {Razorpay} A new Razorpay instance.
 */
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  
  // CRITICAL: Check if keys are available
  if (!key_id || !key_secret) {
    throw new Error('Razorpay keys not configured. Please check your .env file for RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  return new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
};


export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: paymentMethod || 'COD',
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        // Assuming User.findByIdAndUpdate exists and works
        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(201).json({ message: 'Order Placed Successfully', orderId: newOrder._id });
    } catch (error) {
        console.log("Error placing COD order:", error);
        res.status(500).json({ message: 'Order Placement Error', error });
    }
};

export const placeOrderRazorpay = async (req,res) => {
    try {
        // Initialize Razorpay instance here to catch configuration errors specifically when this endpoint is hit
        const razorpayInstance = getRazorpayInstance();
        
        const {items , amount , address} = req.body;
        const userId = req.userId;
        
        // 1. Create Order in DB (Pending state)
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        // 2. Create Order in Razorpay
        const options = {
            amount:amount * 100, // Razorpay expects amount in paise (multiply by 100)
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString() // Set your DB Order ID as receipt
        }
        
        const order = await razorpayInstance.orders.create(options)
        
        // 3. Send the Razorpay order details back to the client
        res.status(200).json({
          orderId: order.id, // Razorpay Order ID
          amount: order.amount,
          currency: order.currency,
          dbOrderId: newOrder._id // Your database Order ID
        })
        
    } catch (error) {
        console.log("Error creating Razorpay order:", error.message);
        res.status(500).json({message: error.message})
        
    }
}

export const verifyRazorpay = async (req , res) => {
    try {
        const userId = req.userId
        // FIX 2: Extract all relevant IDs, including the dbOrderId
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId} = req.body
        
        if (!dbOrderId) {
             return res.status(400).json({message: 'Missing database Order ID', success: false});
        }
        
        // Optional: Add Signature Verification here for maximum security

        const razorpayInstance = getRazorpayInstance(); 
        
        // Fetch the order using the RAZORPAY ID to confirm status
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderInfo.status === 'paid'){
            
            // FIX 4: Use the dbOrderId (MongoDB _id) passed from the client to update the Order
            await Order.findByIdAndUpdate(dbOrderId,{payment:true});
            
            await User.findByIdAndUpdate(userId,{cartData:{}});
            res.status(200).json({message:'Payment Successful', success: true}) 
        }else{
            // Payment failed or status is not 'paid'
            res.json({message:'Payment Failed', success: false}) 
        }
        
    } catch (error) {
        console.log("Error in verifyRazorpay:", error.message)
        res.status(500).json({message:error.message, success: false})
        
    }
}


export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
        
    }
};

//for admin
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }

}
export const updateStatus = async (req, res) => {
    try {
        const {orderId , status} = req.body

        await Order.findByIdAndUpdate(orderId , {status})
        return res.status(201).json({message:'Status Updated'})
        
    } catch (error) {
        return res.status(500).json({message :error.message})
        
    }
}