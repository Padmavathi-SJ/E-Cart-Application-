import { db } from '../config/db.js';

export const getItemsBySubCategoryId = async (sub_id) => {
    const sql = `
       SELECT item_id, item_name, item_description, special_content, price, stock_quantity, image_url
FROM items
WHERE sub_id = ?
ORDER BY added_at DESC;

    `;
    try {
        const [rows] = await db.query(sql, [sub_id]);
        return rows;
    } catch (err) {
        throw err;
    }
};
