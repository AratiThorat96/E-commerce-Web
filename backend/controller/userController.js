import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const getCurrentAdmin = async (req, res) => {
    try {
        // The admin's email is attached to the request by the isAdminAuth middleware
        const adminEmail = req.adminEmail; 
        if (!adminEmail) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ email: adminEmail ,role:"admin"});
    } catch (error) {
        console.error("getCurrentAdmin error:", error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};
