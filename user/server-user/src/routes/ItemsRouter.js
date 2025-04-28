import express from "express";
import { fetchItemsBySubCategoryId } from "../contollers/ItemsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch items by subcategory ID
router.get("/subcategories/:sub_id/items", verifyToken, fetchItemsBySubCategoryId);

export default router;
