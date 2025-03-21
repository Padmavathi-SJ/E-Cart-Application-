import { getProductsBySubcategory, addProductImage } from "../models/AddImagesModel.js";

export const fetchProductsBySubcategory = async (req, res) => {
    try {
        const { sub_id } = req.params;
        const products = await getProductsBySubcategory(sub_id);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Upload product image
export const uploadImage = async (req, res) => {
    try {
        const { product_id } = req.body;
        const image_url = req.file.path; // Assuming you're using Multer for file uploads

        await addProductImage(product_id, image_url);
        res.status(201).json({ message: "Image uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Server error while uploading image" });
    }
};