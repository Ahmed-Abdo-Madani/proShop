import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMIddleware.js";


import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview
} from "../controllers/productsController.js";

//@desc         Get All Products & Post Create Sample Product
//@route        Get & Post /api/products
//@access       Public & Private/admin
router.route("/").get(getProducts).post(protect,admin,createProduct);


//@desc         Get & Delete & Put  single Product
//@route        Get & Delete & Put /api/products/:id
//@access       Public & Private/admin
router.route("/:id")
.get(getProductById)
.delete(protect, admin, deleteProductById)
.put(protect,admin,updateProduct);


//@desc         Get & Delete & Put  single Product
//@route        Get & Delete & Put /api/products/:id
//@access       Public & Private/admin
router.route("/:id/reviews").post(protect,createProductReview);

export default router;
