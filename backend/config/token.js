import jwt from "jsonwebtoken";

// Function to generate JWT token
export const genToken = async (userId) => {
    try {
        const token = await jwt.sign(
            { userId },                  // payload
            process.env.JWT_SECRET,       // secret from .env
            { expiresIn: "7d" }           // token expires in 7 days
        );
        return token;
    } catch (error) {
        console.log("Token generation error:", error);
        throw new Error("Failed to generate token");
    }
};


 // ✅ export correctly

 export const genToken1 = async (email) => {
    try {
        const token = await jwt.sign(
            { email },                  // payload
            process.env.JWT_SECRET,       // secret from .env
            { expiresIn: "1d" }           // token expires in 1 day  // Corrected comment
        );
        return token;
    } catch (error) {
        console.log("Token generation error:", error);
        throw new Error("Failed to generate token");
    }
};