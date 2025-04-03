import express from "express";
import { fetchItemsBySubProductCategoryId } from "../contollers/ProductController.js";

const router = express.Router();

// Route to fetch items by subcategory ID
router.get("/subProductCategories/:sub_p_id/product-items", fetchItemsBySubProductCategoryId);

export default router;
