import { addProduct, addSubProduct } from "../models/ProductModel.js";

// Create a new product category
export const createProduct = async (req, res) => {
    const { p_name } = req.body;
    if (!p_name) {
        return res.status(400).json({ success: false, message: "Product name required" });
    }

    try {
        const result = await addProduct(p_name);
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: "Error adding product", error: err.message });
    }
};

// Create a new sub-product
export const createSubProduct = async (req, res) => {
    const { p_id, sub_p_name } = req.body;
    if (!p_id || !sub_p_name) {
        return res.status(400).json({ success: false, message: "Product ID and sub-product name required" });
    }

    try {
        const result = await addSubProduct(p_id, sub_p_name);
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: "Error adding sub-product", error: err.message });
    }
};
