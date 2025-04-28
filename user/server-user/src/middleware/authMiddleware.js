// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided or incorrect format.");
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.secretkey);
        console.log("Token verified. Decoded payload:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};