import express from "express";
import { fetchCategories, createCategory } from "../controllers/AllCategories.js";

const router = express.Router();

router.get("/categories", fetchCategories);
router.post("/categories", createCategory);

export default router;
