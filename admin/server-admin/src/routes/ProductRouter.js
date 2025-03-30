import express from "express";
import { createProduct, createSubProduct, fetchAllProducts,  fetchSubProductCategoriesByProductId} from "../controllers/ProductController.js";

const router = express.Router();


router.post("/add-product", createProduct);
router.post("/add-sub-product", createSubProduct);
router.get("/product-categories", fetchAllProducts);
router.get("/product-categories/:p_id/sub-products", fetchSubProductCategoriesByProductId);

export default router;
