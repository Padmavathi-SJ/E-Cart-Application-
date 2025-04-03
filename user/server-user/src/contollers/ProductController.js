import { getItemsBySubProductCategoryId } from '../models/ProductItemsModel.js';

export const fetchItemsBySubProductCategoryId = async (req, res) => {
    const { sub_id } = req.params;

    if (!sub_id) {
        return res.status(400).json({ success: false, message: "Subcategory ID is required" });
    }

    try {
        const items = await getItemsBySubProductCategoryId(sub_id);

        // ✅ Fix: Ensure `image_url` does not get duplicated
        const updatedItems = items.map(item => ({
            ...item,
            image_url: item.image_url?.startsWith("http") 
                ? item.image_url.replace(/['"]+/g, '')  // Remove any unwanted quotes
                : `http://localhost:5001/uploads/${item.image_url.replace(/['"]+/g, '')}`
        }));

        res.json({ success: true, items: updatedItems });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};

