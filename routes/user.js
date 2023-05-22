import express from "express";
// import { User } from "../models/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import {  getMyProfile, register, login, logout } from "../controllers/user.js";
const router = express.Router();


router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile); 

export default router;