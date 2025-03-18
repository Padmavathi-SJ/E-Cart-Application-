import {db} from '../config/db.js';

export const createUser = (name, email, password, callback) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("MySQL Insert Error:", err);
            return callback(err, null);
        }
        callback(null, result);
    });
};


export const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";  // ✅ Corrected Query

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("MySQL Query Error:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

