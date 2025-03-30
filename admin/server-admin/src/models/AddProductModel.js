import db from "../config/db.js";

// Add a new product
export const addProduct = async (productData) => {
    const { product_name, description, price, stock, brand, sub_id } = productData;
    const sql = `
        INSERT INTO products (product_name, description, price, stock, brand, sub_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await db.query(sql, [product_name, description, price, stock, brand, sub_id]);
        return { success: true, message: "Product added successfully", product_id: result.insertId };
    } catch (err) {
        throw err;
    }
};