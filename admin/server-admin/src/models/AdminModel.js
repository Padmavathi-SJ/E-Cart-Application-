import db from "../config/db.js";

// Find admin by email
export const findAdminByEmail = async (email) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    try {
        const [result] = await db.query(sql, [email]);
        return result[0] || null;
    } catch (err) {
        throw err;
    }
};