import db from "../config/db.js";

export const findAdminByEmail = (email, callback) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0]);
    });
};
