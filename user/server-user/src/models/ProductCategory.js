import {db} from '../config/db.js';

export const getAllProducts = async () => {
    const sql = "SELECT * FROM ProductCategories ORDER BY added_at DESC";
    try {
        const [rows] = await db.query(sql);
       // console.log("Database Query Result:", rows); // Debugging log
        return rows;
    } catch (err) {
      //  console.error("Database Query Error:", err);
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