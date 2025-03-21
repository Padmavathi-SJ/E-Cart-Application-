import db from "../config/db.js";

// Fetch products by subcategory (returns a Promise)
export const getProductsBySubcategory = async (sub_id) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE sub_id = ?", [sub_id]);
        return rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

// Add product image to the database (returns a Promise)
export const addProductImage = async (product_id, image_url) => {
    try {
        const result = await db.query("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)", [product_id, image_url]);
        return { success: true, message: "Image added successfully" };
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};
