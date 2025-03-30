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
