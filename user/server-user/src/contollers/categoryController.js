import { fetchCategories, fetchSubcategories } from "../models/categoryModel.js";

export const getCategoriesWithSubcategories = async (req, res) => {
    try {
        const categories = await fetchCategories();
        const subcategories = await fetchSubcategories();

        // Ensure categories and subcategories are valid arrays
        if (!Array.isArray(categories) || !Array.isArray(subcategories)) {
            throw new Error("Database query did not return an array");
        }

        const categoriesWithSubcategories = categories.map((category) => ({
            c_id: category.c_id,
            c_name: category.c_name,
            subcategories: subcategories
                .filter((sub) => sub.c_id === category.c_id)
                .map((sub) => ({
                    sub_id: sub.sub_id,
                    sub_name: sub.sub_name,
                })),
        }));

        res.status(200).json(categoriesWithSubcategories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
