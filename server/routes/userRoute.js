import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddeware.js";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserProfile,
  verifyEmail
} from "../controller/userController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.get("/verify-email/:token", verifyEmail)

// Protected routes
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile)
  .delete(authMiddleware, deleteUser);

// Admin routes
router
  .route("/admin/users")
  .get(authMiddleware, isAdmin, getAllUsers)
  .get(authMiddleware, isAdmin, getUserById)
  .delete(authMiddleware, isAdmin, deleteUser);

export default router;
