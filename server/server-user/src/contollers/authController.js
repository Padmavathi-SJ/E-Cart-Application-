import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";


export const register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Check if user already exists
    findUserByEmail(email, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Register new user
        createUser(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error during registration" });

            res.json({ message: "User registered successfully" });
        });
    });
};


export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    findUserByEmail(email, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length === 0) return res.status(401).json({ error: "User not found" });

        const user = result[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    });
};
