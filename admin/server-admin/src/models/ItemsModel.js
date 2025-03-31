import db from '../config/db.js';

export const addItem = async (sub_id, c_id, item_name, item_description, special_content, price, stock_quantity, image_url) => {
    const sql = "INSERT INTO items (sub_id, c_id, item_name, item_description, special_content, price, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
        await db.query(sql, [sub_id, c_id, item_name, item_description, special_content, price, stock_quantity, image_url]);
        return { success: true, message: "Item added successfully" };
    } catch (err) {
        throw err;
    }
};
