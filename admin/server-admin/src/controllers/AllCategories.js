import { 
    getAllCategories, 
    getSubcategoriesByCategoryId, 
    addCategory, 
    addSubcategory 
} from "../models/AllCategoryModel.js";

// Fetch all categories (without subcategories)
export const fetchCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json({ success: true, categories });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};



// Fetch subcategories based on category ID
export const fetchSubcategoriesByCategoryId = async (req, res) => {
    const { c_id } = req.params;
 //   console.log("API Hit: Fetching subcategories for category ID:", c_id); // Debugging

    if (!c_id) return res.status(400).json({ success: false, message: "Category ID required" });

    try {
        const subcategories = await getSubcategoriesByCategoryId(c_id);
      //  console.log("Subcategories from DB:", subcategories);  // Check if DB returns data
        res.json({ success: true, subcategories });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
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
