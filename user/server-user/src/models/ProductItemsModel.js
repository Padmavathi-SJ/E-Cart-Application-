import {db} from '../config/db.js';

export const getItemsBySubProductCategoryId = async(sub_p_id) => {
    const sql=`
    SELECT item_id, item_name, item_description, special_content, price, stock_quantity, image_url
    FROM product_items
    WHERE sub_p_id = ?
    ORDER BY sub_p_id = ?
    ORDER BY added_at DESC;
    `;

    try{
        const [rows] = await db.query(sql, [sub_p_id]);
        return rows;
    } catch(err){
        throw err;
    }
};
