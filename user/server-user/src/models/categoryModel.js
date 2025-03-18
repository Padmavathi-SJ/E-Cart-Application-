import db from "../config/db.js";

export const fetchCategories = async () => {
    try {
        const [result] = await db.query("SELECT * FROM allcategories");
        console.log("Categories Query Result:", result); // Debugging
        return result || []; // Ensure an array is returned
    } catch (error) {
        console.error("Error in fetchCategories:", error);
        throw error;
    }
};

export const fetchSubcategories = async () => {
    try {
        const [result] = await db.query("SELECT * FROM subcategories");
        console.log("Subcategories Query Result:", result); // Debugging
        return result || []; // Ensure an array is returned
    } catch (error) {
        console.error("Error in fetchSubcategories:", error);
        throw error;
    }
};
