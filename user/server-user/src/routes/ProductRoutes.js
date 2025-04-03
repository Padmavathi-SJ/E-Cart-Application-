import express from "express";
import { fetchAllProducts,  fetchSubProductCategoriesByProductId} from "../contollers/ProductCategory.js";

const router = express.Router();

router.get("/product-categories", fetchAllProducts);
router.get("/product-categories/:p_id/sub-products", fetchSubProductCategoriesByProductId);

export default router;
