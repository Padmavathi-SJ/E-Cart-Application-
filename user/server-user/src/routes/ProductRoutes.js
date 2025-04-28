import express from "express";
import { fetchAllProducts,  fetchSubProductCategoriesByProductId} from "../contollers/ProductCategory.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/product-categories", verifyToken, fetchAllProducts);
router.get("/product-categories/:p_id/sub-products", verifyToken, fetchSubProductCategoriesByProductId);

export default router;
