import db from "../config/db.js";

// Add a new product
export const addProduct = (productData, callback) => {
    const { p_name, description, price, stock, category_id, subcategory_id } = productData;
    
    const sql = `
        INSERT INTO Products (p_name, description, price, stock, category_id, subcategory_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [p_name, description, price, stock, category_id, subcategory_id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { success: true, message: "Product added successfully", product_id: result.insertId });
    });
};

// Add product images
export const addProductImages = (product_id, images, callback) => {
    if (!images || images.length === 0) return callback(null, { success: true, message: "No images added" });

    const sql = "INSERT INTO ProductImages (product_id, image_url) VALUES ?";
    const values = images.map(image => [product_id, image]);

    db.query(sql, [values], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { success: true, message: "Product images added successfully" });
    });
};

// Fetch all products
export const getAllProducts = (callback) => {
    const sql = "SELECT * FROM Products ORDER BY added_at DESC";
    db.query(sql, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// Fetch product by ID
export const getProductById = (p_id, callback) => {
    const sql = "SELECT * FROM Products WHERE p_id = ?";
    db.query(sql, [p_id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0]); 
    });
};

// Fetch product images by product ID
export const getProductImages = (p_id, callback) => {
    const sql = "SELECT image_url FROM ProductImages WHERE product_id = ?";
    db.query(sql, [p_id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.map(img => img.image_url));
    });
};
