import { getAllProducts, getSubProductCategoriesByProductId } from '../models/ProductCategory.js';

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
      //  console.log("Fetched Products from DB:", products); // Debugging log
        res.json({ success: true, productCategories: products }); // Ensure this key matches frontend usage
    } catch (err) {
      //  console.error("Error fetching products:", err);
        res.status(500).json({ success: false, message: "Error fetching products", error: err.message });
    }
};

export const fetchSubProductCategoriesByProductId = async (req, res) => {
    const { p_id } = req.params;
    if (!p_id) return res.status(400).json({ success: false, message: "Product ID required" });

    try {
        const subProducts = await getSubProductCategoriesByProductId(p_id);
        res.json({ success: true, subProducts });
    } catch (err) {
       // console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};