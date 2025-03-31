import express from "express";
import { fetchItemsBySubCategoryId } from "../contollers/ItemsController.js";

const router = express.Router();

// Route to fetch items by subcategory ID
router.get("/subcategories/:sub_id/items", fetchItemsBySubCategoryId);

export default router;
