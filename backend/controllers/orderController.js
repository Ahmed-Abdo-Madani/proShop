import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc         create new Orders
//@route        Post /api/users/order
//@access       private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

export { addOrderItems };
