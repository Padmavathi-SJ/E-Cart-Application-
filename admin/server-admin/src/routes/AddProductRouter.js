import express from "express";
import { 
    fetchAllProducts, 
    fetchProductById, 
    createProduct, // ✅ Correct function name
  //  updateProduct, 
  //  deleteProduct 
} from "../controllers/AddProductController.js";


const router = express.Router();

router.get("/products", fetchAllProducts);
router.get("/products/:p_id", fetchProductById);
router.post("/add-product", createProduct);
//router.put("/products/:p_id", updateProduct);
//router.delete("/products/:p_id", deleteProduct);

export default router;
