import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//@desc         Auth users & get Token
//@route        Post /api/users/login
//@access       public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(401);
    throw new Error("Wrong Email or Password .");
  }
});

//@desc         Register New Users
//@route        Post /api/users
//@access       public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { _id, name, email, isAdmin } = user;
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc         get user profile
//@route        GET /api/users/profile
//@access       private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
      // ...req.user._doc,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

export { authUser, registerUser, getUserProfile };
