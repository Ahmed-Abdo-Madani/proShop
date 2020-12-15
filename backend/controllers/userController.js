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

//@desc         Update user profile
//@route        PUT /api/users/profile
//@access       private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

//@desc         Get All Users
//@route        GET /api/users
//@access       private/ Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc         Delete User By Id
//@route        DELETE /api/users/:id
//@access       private/ Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed." });
  } else {
    res.status(404);
    throw new Error(" user Not Found.");
  }
});

//@desc         Get  User By Id
//@route        GET /api/users/:id
//@access       private/ Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

//@desc         Update user
//@route        PUT /api/users/:id
//@access       private / admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUser,
};
