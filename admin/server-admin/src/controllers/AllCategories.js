import { getAllCategories, addCategory } from "../models/AllCategoryModel.js";

// Controller to fetch categories
export const fetchCategories = (req, res) => {
    getAllCategories((err, categories) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, categories });
    });
};

// Controller to add category
export const createCategory = (req, res) => {
    const { c_name } = req.body;
    if (!c_name) return res.status(400).json({ success: false, message: "Category name required" });

    addCategory(c_name, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error adding category" });
        res.json(result);
    });
};
