import { addProductItem } from "../models/ProductItItems.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
    filename: (req, file, cd) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({storage}).single("item_image");


export const createProductItem = async (req, res) => {
    const { sub_p_id, p_id, item_name, item_description, special_content, price, stock_quantity } = req.body;
    const image_url = req.file ? `http://localhost:5001/uploads/${req.file.filename}` : null;

    if (!sub_p_id || !p_id || !item_name || !price || !stock_quantity || !item_description || !special_content) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const result = await addProductItem(sub_p_id, p_id, item_name, item_description, special_content, price, stock_quantity, image_url);
        res.json(result);
    } catch (err) {
        console.log("Database error: ", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};