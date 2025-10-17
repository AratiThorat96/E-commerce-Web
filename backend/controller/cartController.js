import User from '../model/userModel.js';

export const addToCart = async (req, res) => {
    try {
        const {itemId , size} = req.body;

        const userData = await User.findById(req.userId);

        if(!userData){
            return res.status(404).json({message : "User not Found"})

        }
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else {
                cartData[itemId][size] =1;
            }
        }else{
            cartData[itemId] ={};
            cartData[itemId][size] =1;
        }
        await User.findByIdAndUpdate(req.userId , {cartData});
        return res.status(201).json({message : "Added to Cart"})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "AddToCart error"})
        
    }
}

export const UpdateCart =async (req , res) => {
    try {
const {itemId ,size ,quantity } = req.body
const userData = await User.findById(req.userId)
let cartData = await userData.cartData;

cartData[itemId] [size] = quantity

await User.findByIdAndUpdate(req.userId, {cartData})

return res.status(201).json({message: "cart updated"})
        
    } catch (error) {
         console.log(error)
        return res.status(500).json({message : "UpdateCart error"})
        
    }
}

export const getUserCart = async (req,res) => {
   try {
    const userData = await User.findById(req.userId)
    let cartData = await userData.cartData;

    return res.status(200).json(cartData)
    
   } catch (error) {
     console.log(error)
        return res.status(500).json({message : "getUserCart error"})
    
   }
}