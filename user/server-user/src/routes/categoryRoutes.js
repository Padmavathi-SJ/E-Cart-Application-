import express from "express";
import { getCategoriesWithSubcategories } from "../contollers/categoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", verifyToken, getCategoriesWithSubcategories);

export default router;
