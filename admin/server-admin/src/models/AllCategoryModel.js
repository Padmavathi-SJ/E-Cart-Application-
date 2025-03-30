import db from "../config/db.js";


// Fetch subcategories based on c_id
export const getSubcategoriesByCategoryId = async (c_id) => {
    const sql = "SELECT sub_id, sub_name FROM Subcategories WHERE c_id = ?";
    try {
        const [result] = await db.query(sql, [c_id]);
      //  console.log("Subcategories from DB:", result);  // Debugging
        return result;
    } catch (err) {
       // console.error("Error fetching subcategories:", err);
        throw err;
    }
};


// Fetch all categories (without subcategories)
export const getAllCategories = async () => {
    const sql = "SELECT * FROM AllCategories ORDER BY added_at DESC";
    try {
        const [result] = await db.query(sql);
        return result;
    } catch (err) {
        throw err;
    }
};

// Add new category
export const addCategory = async (c_name) => {
    const sql = "INSERT INTO AllCategories (c_name) VALUES (?)";
    try {
        await db.query(sql, [c_name]);
        return { success: true, message: "Category added successfully" };
    } catch (err) {
        throw err;
    }
};

// Add subcategory
export const addSubcategory = async (c_id, sub_name) => {
    const sql = "INSERT INTO Subcategories (c_id, sub_name) VALUES (?, ?)";
    try {
        await db.query(sql, [c_id, sub_name]);
        return { success: true, message: "Subcategory added successfully" };
    } catch (err) {
        throw err;
    }
};