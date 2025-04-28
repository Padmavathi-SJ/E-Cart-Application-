import express from "express";
import { fetchItemsBySubProductCategoryId } from "../contollers/ProductController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch items by subcategory ID
router.get("/subProductCategories/:sub_p_id/product-items", verifyToken, fetchItemsBySubProductCategoryId);

export default router;
