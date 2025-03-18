import express from "express";
import { getCategoriesWithSubcategories } from "../contollers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategoriesWithSubcategories);

export default router;
