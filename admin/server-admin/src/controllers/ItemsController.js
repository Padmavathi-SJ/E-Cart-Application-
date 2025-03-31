import { addItem } from '../models/ItemsModel.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../../../uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage }).single("item_image");


export const createItem = async (req, res) => {
    const { sub_id, c_id, item_name, item_description, special_content, price, stock_quantity } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!sub_id || !c_id || !item_name || !price || !stock_quantity || !item_description || !special_content) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const result = await addItem(sub_id, c_id, item_name, item_description, special_content, price, stock_quantity, image_url);
        res.json(result);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};