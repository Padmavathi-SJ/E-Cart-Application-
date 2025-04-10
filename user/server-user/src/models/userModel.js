import { db } from "../config/db.js";

// Create a new user
export const createUser = async (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    try {
        const [result] = await db.query(sql, [name, email, password]);
        return result;
    } catch (error) {
        console.error("MySQL Insert Error:", error);
        throw error;
    }
};

// Find user by email
export const findUserByEmail = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    try {
        const [rows] = await db.query(sql, [email]);
        return rows[0]; // return first user if exists
    } catch (error) {
        console.error("MySQL Query Error:", error);
        throw error;
    }
};
