import { User } from "../models/user.js ";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const getAllUsers = async (req, res) => {};

//Login API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    // if (!user)
    //   // if user NOT exist than
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email and password",
    //   });

    // above using ERROR Handler class
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email and password",
    //   });

    // above using error handler class
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, `Welcome Back",${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// REGISTER API
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // if (user)
    //   // if user exist than
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Alredy Exist",
    //   });

    //above using error handler class
    if (user) return next(new ErrorHandler("User Alredy Exist", 400));

    //hasing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //else create one
    user = await User.create({ name, email, password: hashedPassword });

    //features
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENC === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENC === "Development" ? false : true,
    })
    .json({ success: true, user: req.user });
};
