import db from "../config/db.js";

// Fetch all categories
export const getAllCategories = (callback) => {
    const sql = "SELECT * FROM AllCategories ORDER BY added_at DESC";
    db.query(sql, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// Add new category
export const addCategory = (c_name, callback) => {
    const sql = "INSERT INTO AllCategories (c_name) VALUES (?)";
    db.query(sql, [c_name], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { success: true, message: "Category added successfully" });
    });
};
