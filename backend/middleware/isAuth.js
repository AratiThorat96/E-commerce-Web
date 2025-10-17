import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    // This is triggered on initial load if user isn't logged in. This is expected.
    if (!token) return res.status(401).json({ message: "User does not have a token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Token is invalid or expired" });

    req.userId = decoded.userId; // ✅ correct key
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

export default isAuth;