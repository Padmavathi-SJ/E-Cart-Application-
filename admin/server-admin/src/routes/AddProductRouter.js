import express from "express";
import { createProduct } from "../controllers/AddProductController.js";

const router = express.Router();

router.post("/add-product", createProduct);

export default router;
