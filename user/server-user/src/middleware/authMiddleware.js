import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401)/json({error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch (err) {
        return req.status(403).json({error: "Invalid or expired token. "});
    }
};