import express from 'express'
import isAuth from '../middleware/isAuth.js'
import isAdminAuth from '../middleware/isAdminAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/OrderController.js'

const orderRoutes = express.Router()
// for user
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
orderRoutes.post("/userorder",isAuth,userOrders)
orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay)

//for admin
orderRoutes.post("/list",isAdminAuth,allOrders)
orderRoutes.get("/list",isAdminAuth,allOrders)
orderRoutes.post("/status",isAdminAuth,updateStatus)


export default orderRoutes