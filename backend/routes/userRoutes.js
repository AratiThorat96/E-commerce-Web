import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentAdmin, getCurrentUser } from "../controller/userController.js";
import isAdminAuth from "../middleware/isAdminAuth.js";

const userRoutes = express.Router();

// GET current user (protected route)
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
// The corrected line below now matches the frontend's API call
userRoutes.get("/getCurrentAdmin", isAdminAuth, getCurrentAdmin);

export default userRoutes;