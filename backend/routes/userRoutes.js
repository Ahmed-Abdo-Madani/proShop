import express from "express";
import { protect, admin } from "../middleware/authMIddleware.js";

const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  updateUser,
  getUserById,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUserById);
export default router;
