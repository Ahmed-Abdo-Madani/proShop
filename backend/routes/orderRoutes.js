import express from "express";
import { protect, admin } from "../middleware/authMIddleware.js";

const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrderToDeliver,
  getPaymentMethods,
  sendPayment
} from "../controllers/orderController.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/paymentmethods").post(protect,getPaymentMethods);
router.route("/sendpayment").post(protect,sendPayment);
router.route("/:id/deliver").put(protect,admin, updateOrderToDeliver);
export default router;
