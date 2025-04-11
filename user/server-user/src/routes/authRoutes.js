import express from "express";
import { loginUser, registerUser } from "../contollers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
