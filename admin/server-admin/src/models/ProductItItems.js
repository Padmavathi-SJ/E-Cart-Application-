import db from '../config/db.js';

export const addProductItem = async (sub_p_id, p_id, item_name, item_description, special_content, price, stock_quantity, image_url) => {
    const sql = "INSERT INTO product_items (sub_p_id, p_id, item_name, item_description, special_content, price, stock_quantity, image_url) VALUES (?,?,?,?,?,?,?,?)";
    try {
        await db.query(sql, [sub_p_id, p_id, item_name, item_description, special_content, price, stock_quantity, image_url]);
        return { success: true, message: "Item added successfully" };
    } catch (err) {
        throw err;
    }
};
