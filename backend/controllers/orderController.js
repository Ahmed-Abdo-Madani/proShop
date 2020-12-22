import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import axios from 'axios'

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

//@desc         Get Payment methods
//@route        post /api/orders/paymentmethods
//@access       private

const getPaymentMethods = asyncHandler(async (req, res) => {
  const paymentMethods=req.body
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL",
    },
  };
  const { data } = await axios.post(
    "https://apitest.myfatoorah.com/v2/InitiatePayment",
    paymentMethods,
    config
  );

  if (data) {
    const paymentMethods = data.Data.PaymentMethods
    res.status(200).json(paymentMethods);
  } else {
    res.status(400);
    throw new Error("Payment not initalized.");
  }
});
//@desc         Send Payment to myFatoora Site
//@route        post /api/orders/sendpayment
//@access       private

const sendPayment = asyncHandler(async (req, res) => {
  const paymentDetails=req.body
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL",
    },
  };
  const { data } = await axios.post(
    "https://apitest.myfatoorah.com/v2/SendPayment",
    paymentDetails,
    config
  );

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error("Payment send error.");
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
  updateOrderToDeliver,
  getPaymentMethods,
  sendPayment
};
