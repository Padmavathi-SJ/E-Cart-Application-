import { addProduct, addProductImages, getAllProducts, getProductById, getProductImages } from "../models/AddProductModel.js";

// Create a new product
export const createProduct = (req, res) => {
    const { p_name, description, price, stock, category_id, subcategory_id, images } = req.body;

    if (!p_name || !price || !stock || !category_id)
        return res.status(400).json({ success: false, message: "Missing required fields" });

    addProduct({ p_name, description, price, stock, category_id, subcategory_id }, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error adding product" });

        const product_id = result.product_id;

        // Add images if provided
        if (images && images.length > 0) {
            addProductImages(product_id, images, (imgErr, imgResult) => {
                if (imgErr) return res.status(500).json({ success: false, message: "Error adding images" });

                res.json({ ...result, images: imgResult });
            });
        } else {
            res.json(result);
        }
    });
};

// Get all products
export const fetchAllProducts = (req, res) => {
    getAllProducts((err, products) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, products });
    });
};

// Get product by ID (with images)
export const fetchProductById = (req, res) => {
    const { p_id } = req.params;
    
    getProductById(p_id, (err, product) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        getProductImages(p_id, (imgErr, images) => {
            if (imgErr) return res.status(500).json({ success: false, message: "Error fetching images" });

            res.json({ success: true, product: { ...product, images } });
        });
    });
};
