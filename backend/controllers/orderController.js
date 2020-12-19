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
    res.status(201).json(createdOrder);
  }
});

//@desc         Get Order By Id
//@route        Get /api/orders
//@access       private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

//@desc         Get All Orders
//@route        Get /api/admin/orders
//@access       private/admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found.");
  }
});

//@desc         Update Order Payment status
//@route        put /api/orders/:id/pay
//@access       private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Paid.");
  }
});

//@desc         Update Order Deliver
//@route        put /api/orders/:id/deliver
//@access       private/admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    

    const updatedOrder = order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order didn`t Change to Delivered || Not Found.");
  }
});

//@desc         Get Logged In user orders
//@route        get /api/orders/myorders
//@access       private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrderToDeliver
};
