import db from "../config/db.js"; // Import database connection

// Add a new product category
export const addProduct = async (p_name) => {
    const sql = "INSERT INTO ProductCategories (p_name) VALUES (?)";
    try {
        await db.query(sql, [p_name]);
        return { success: true, message: "Product added successfully" };
    } catch (err) {
        throw err;
    }
};

// Add a new sub-product under a product category
export const addSubProduct = async (p_id, sub_p_name) => {
    const sql = "INSERT INTO ProductSubCategories (p_id, sub_p_name) VALUES (?, ?)";
    try {
        await db.query(sql, [p_id, sub_p_name]);
        return { success: true, message: "Sub-product added successfully" };
    } catch (err) {
        throw err;
    }
};

export const getAllProducts = async () => {
    const sql = "SELECT * FROM ProductCategories ORDER BY added_at DESC";
    try {
        const [rows] = await db.query(sql);
        console.log("Database Query Result:", rows); // Debugging log
        return rows;
    } catch (err) {
        console.error("Database Query Error:", err);
        throw err;
    }
};

export const getSubProductCategoriesByProductId = async (p_id) => {
    const sql = "SELECT sub_p_id, sub_p_name FROM productSubCategories WHERE p_id = ?";
    try {
        const [result] = await db.query(sql, [p_id]);
        return result;
    } catch (err) {
        throw err;
    }
};

