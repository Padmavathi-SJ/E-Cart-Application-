import db from "../config/db.js";

export const getProductsBySubcategory = async (sub_id) => {
    try {
        console.log("Querying product names for sub_id:", sub_id);

        const [rows] = await db.query("SELECT product_name FROM products WHERE sub_id = ?", [sub_id]);

        // Debugging: Log the actual database response
        console.log("Database Response:", rows);

        if (!Array.isArray(rows)) {
            console.error("❌ Query result is not an array!");
            return [];
        }

        return rows.map(row => row.product_name); 
    } catch (error) {
        console.error("❌ Database Error:", error);
        return []; 
    }
};


export const addProductImage = async (product_id, image_url) => {
    try {
        await db.query("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)", [product_id, image_url]);
        return { success: true, message: "Image added successfully" };
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};
