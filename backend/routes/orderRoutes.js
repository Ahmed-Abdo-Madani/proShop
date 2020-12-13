import express from "express";
import { protect } from "../middleware/authMIddleware.js";

const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders
} from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
export default router;
