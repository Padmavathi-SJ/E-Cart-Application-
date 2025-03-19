import { addProduct } from "../models/AddProductModel.js";

// Create a new product
export const createProduct = (req, res) => {
    const { product_name, description, price, stock, brand, sub_id } = req.body;

    // Check for missing required fields
    if (!product_name || !price || !stock || !sub_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Add product to the database
    addProduct({ product_name, description, price, stock, brand, sub_id }, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error adding product" });

        res.json(result); // Return success response
    });
};
