import express from "express";
import { protect, admin } from "../middleware/authMIddleware.js";

const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
export default router;
