import { db } from "../config/db.js";

// Fetch all categories
export const fetchCategories = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM AllCategories ORDER BY added_at DESC");
        return rows;
    } catch (error) {
        console.error("Error in fetchCategories:", error);
        throw error;
    }
};

// Fetch all subcategories
export const fetchSubcategories = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM subcategories");
        return rows;
    } catch (error) {
        console.error("Error in fetchSubcategories:", error);
        throw error;
    }
};
