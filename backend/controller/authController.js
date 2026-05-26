import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import  {genToken, genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong Password" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(201).json(userResponse);

    } catch (error) {
        console.log("Registration error:", error);
        return res.status(500).json({ message: `Registration error: ${error}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(200).json(userResponse);

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: `Login error: ${error}` });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logOut successful" });
    } catch (error) {
        console.log("logOut error:", error);
        return res.status(500).json({ message: `LogOut error: ${error}` });
    }
};

export const googleLogin = async (req,res) => {
    try {
        let {name,email} = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,email
            })
        }

        

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(200).json(userResponse);

    }catch(error){
        console.log("googleLogin error:", error);
        return res.status(500).json({ message: `googleLogin error: ${error}` });

    }
};

export const adminLogin =async(req, res) => {
    try{
        let {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
             let token = await genToken1(email);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

       

        return res.status(200).json(token);

            
        }
        return res.status(400).json({message:"Invalid credintials"})

    }catch(error){
        console.log("AdminLogin error:", error);
        return res.status(500).json({ message: `AdminLogin error: ${error}` });
        

    }
}
