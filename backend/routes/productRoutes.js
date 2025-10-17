import express from 'express'
import upload from '../middleware/multer.js'
import { addProduct, listProduct, removeProduct } from '../controller/productController.js'
import isAdminAuth from '../middleware/isAdminAuth.js'

let productRoutes = express.Router()

productRoutes.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1}
]),addProduct)

productRoutes.get("/list",listProduct)
productRoutes.post("/remove/:id",isAdminAuth,removeProduct)

export default productRoutes