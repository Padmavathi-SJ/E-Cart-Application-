import db from '../config/db.js';

export const getAllCategories = (req, res) => {
    const query = "SELECT c_id, c_name FROM AllCategories"; // Ensure `c_id` is included
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json({ categories: results }); // Wrap inside an object
    });
};


