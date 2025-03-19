import db from "../config/db.js";

// Fetch all categories with their subcategories
export const getAllCategoriesWithSubcategories = (callback) => {
    const sql = `
        SELECT c.c_id, c.c_name, s.sub_id, s.sub_name 
        FROM allaategories c
        LEFT JOIN subcategories s ON c.c_id = s.c_id
        ORDER BY c.added_at DESC, s.added_at DESC
    `;

    db.query(sql, (err, result) => {
        if (err) return callback(err, null);

        // Organizing results into category objects with subcategories array
        const categoriesMap = {};
        result.forEach((row) => {
            if (!categoriesMap[row.c_id]) {
                categoriesMap[row.c_id] = {
                    c_id: row.c_id,
                    c_name: row.c_name,
                    subcategories: [],
                };
            }
            if (row.sub_id) {
                categoriesMap[row.c_id].subcategories.push({
                    sub_id: row.sub_id,
                    sub_name: row.sub_name,
                });
            }
        });

        callback(null, Object.values(categoriesMap));
    });
};

// Fetch subcategories based on c_id
export const getSubcategoriesByCategoryId = (c_id, callback) => {
    const sql = "SELECT sub_id, sub_name FROM Subcategories WHERE c_id = ?";
    db.query(sql, [c_id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};


// Fetch all categories (without subcategories)
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

// Add subcategory
export const addSubcategory = (c_id, sub_name, callback) => {
    const sql = "INSERT INTO Subcategories (c_id, sub_name) VALUES (?, ?)";
    db.query(sql, [c_id, sub_name], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { success: true, message: "Subcategory added successfully" });
    });
};
