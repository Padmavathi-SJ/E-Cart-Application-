import db from "../config/db.js";

// Add a new product
export const addProduct = (productData, callback) => {
    const { product_name, description, price, stock, brand, sub_id } = productData;

    const sql = `
        INSERT INTO products (product_name, description, price, stock, brand, sub_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [product_name, description, price, stock, brand, sub_id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { success: true, message: "Product added successfully", product_id: result.insertId });
    });
};
