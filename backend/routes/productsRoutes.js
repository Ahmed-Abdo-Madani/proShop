import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
} from "../controllers/productsController.js";

//@desc         Get All Products
//@route        Get /api/products
//@access       public

router.route("/").get(getProducts);

//@desc         Get single Product
//@route        Get /api/products/:id
//@access       public

router.route("/:id").get(getProductById);

export default router;
