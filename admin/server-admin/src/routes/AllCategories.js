import express from "express";
import { 
    fetchCategories, 
    fetchCategoriesWithSubcategories, 
    fetchSubcategoriesByCategoryId, 
    createCategory, 
    createSubcategory 
} from "../controllers/AllCategories.js";

const router = express.Router();

router.get("/categories", fetchCategories);
router.get("/categories-subcategories", fetchCategoriesWithSubcategories);
router.get("/categories/:c_id/subcategories", fetchSubcategoriesByCategoryId);
router.post("/categories", createCategory);
router.post("/subcategories", createSubcategory);

export default router;
