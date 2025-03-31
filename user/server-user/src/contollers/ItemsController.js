import { getItemsBySubCategoryId } from '../models/ItemsModel.js';

export const fetchItemsBySubCategoryId = async (req, res) => {
    const { sub_id } = req.params;

    if (!sub_id) {
        return res.status(400).json({ success: false, message: "Subcategory ID is required" });
    }

    try {
        const items = await getItemsBySubCategoryId(sub_id);

        // ✅ Ensure the full URL for images is provided in the response
        const updatedItems = items.map(item => ({
            ...item,
            image_url: item.image_url ? `http://localhost:5000${item.image_url}` : null
        }));

        res.json({ success: true, items: updatedItems });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};
