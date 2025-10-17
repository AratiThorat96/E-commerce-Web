import jwt from 'jsonwebtoken';

const isAdminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Admin does not have a token" });

    // Assuming the admin token is signed with a different secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (!decoded) return res.status(401).json({ message: "Admin token is invalid or expired" });
    
    // Attaching the admin's email to the request object
    // This assumes genToken1 signs the token with the email as the payload
    req.adminEmail = decoded.email; 
    next();
  } catch (error) {
    console.error("isAdminAuth error:", error);
    return res.status(500).json({ message: `isAdminAuth error: ${error.message}` });
  }
};

export default isAdminAuth;