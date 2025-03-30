import { getProductsBySubcategory, addProductImage } from "../models/AddImagesModel.js";


export const fetchProductsBySubcategory = async (req, res) => {
    try {
        const { sub_id } = req.params;

        if (!sub_id) {
            return res.status(400).json({ error: "Subcategory ID is required" });
        }

        const productNames = await getProductsBySubcategory(sub_id);

        console.log("Fetched product names:", productNames);

        res.json(productNames.length ? productNames : []);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Upload product image
export const uploadImage = async (req, res) => {
    try {
        const { product_id } = req.body;
        const image_url = req.file.path; 

        await addProductImage(product_id, image_url);
        res.status(201).json({ message: "Image uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Server error while uploading image" });
    }
};
