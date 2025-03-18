import { fetchCategories, fetchSubcategories } from "../models/categoryModel.js";

export const getCategoriesWithSubcategories = async (req, res) => {
    try {
        const categories = await fetchCategories();
        const subcategories = await fetchSubcategories();

        // Create a mapping for subcategories grouped by category ID
        const subcategoryMap = {};
        subcategories.forEach(sub => {
            if (!subcategoryMap[sub.c_id]) {
                subcategoryMap[sub.c_id] = [];
            }
            subcategoryMap[sub.c_id].push({
                sub_id: sub.sub_id,
                sub_name: sub.sub_name,
            });
        });

        // Attach subcategories to their respective parent category
        const categoriesWithSubcategories = categories.map(category => ({
            ...category,
            subcategories: subcategoryMap[category.c_id] || [], // Default to an empty array if no subcategories
        }));

        res.json({ success: true, categories: categoriesWithSubcategories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
