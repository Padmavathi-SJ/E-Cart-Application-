import express from "express";
import { createProduct, createSubProduct } from "../controllers/ProductController.js";

const router = express.Router();

// Route to add a new product
router.post("/add-product", createProduct);

// Route to add a new sub-product
router.post("/add-sub-product", createSubProduct);

export default router;
