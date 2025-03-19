import { 
    getAllCategories, 
    getAllCategoriesWithSubcategories, 
    getSubcategoriesByCategoryId, 
    addCategory, 
    addSubcategory 
} from "../models/AllCategoryModel.js";

// Fetch all categories (without subcategories)
export const fetchCategories = (req, res) => {
    getAllCategories((err, categories) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, categories });
    });
};

// Fetch all categories with their subcategories
export const fetchCategoriesWithSubcategories = (req, res) => {
    getAllCategoriesWithSubcategories((err, categories) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, categories });
    });
};

// Fetch subcategories based on category ID
export const fetchSubcategoriesByCategoryId = (req, res) => {
    const { c_id } = req.params;
    if (!c_id) return res.status(400).json({ success: false, message: "Category ID required" });

    getSubcategoriesByCategoryId(c_id, (err, subcategories) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, subcategories });
    });
};

// Create a new category
export const createCategory = (req, res) => {
    const { c_name } = req.body;
    if (!c_name) return res.status(400).json({ success: false, message: "Category name required" });

    addCategory(c_name, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error adding category" });
        res.json(result);
    });
};

// Create a new subcategory
export const createSubcategory = (req, res) => {
    const { c_id, sub_name } = req.body;
    if (!c_id || !sub_name) 
        return res.status(400).json({ success: false, message: "Category ID and subcategory name required" });

    addSubcategory(c_id, sub_name, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error adding subcategory" });
        res.json(result);
    });
};
