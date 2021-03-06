import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc         Get All Products
//@route        Get /api/products
//@access       public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc         Get single Product
//@route        Get /api/products/:id
//@access       public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//@desc        Delete Product by Id
//@route        Delete /api/products/:id
//@access       private / admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//@desc         Create Product
//@route        POST /api/products
//@access       private/ Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    description: "sample description",
    price: 0,
    user: req.user._id,
    brand: "sample brand",
    image: "/images/sample.jpg",
    category: "sample category",
    rating: 0,
    countInStock: 0,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc         Update Product
//@route        PUT /api/products/:id
//@access       private/ Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    image,
    category,
    rating,
    numReviews,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.brand = brand;
    product.image = image;
    product.category = category;
    product.rating = rating;
    product.numReviews = numReviews;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found.");
  }
});

//@desc        Creat New Review
//@route        POST /api/products/:id/revirews
//@access       private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product Already Reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "review added" });
    }
  } else {
    res.status(404);
    throw new Error("Product Not Found.");
  }
});

//@desc         Get Top Rating Products
//@route        Get /api/products/top
//@access       public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
