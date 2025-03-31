import { addProduct, addSubProduct,  getAllProducts, getSubProductCategoriesByProductId} from "../models/ProductModel.js";

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