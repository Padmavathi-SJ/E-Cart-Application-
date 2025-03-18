import { findAdminByEmail } from "../models/AdminModel.js";

export const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    findAdminByEmail(email, (err, admin) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Directly compare the plain text password (NO bcrypt)
        if (password !== admin.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ success: true, message: "Login successful", admin });
    });
};
