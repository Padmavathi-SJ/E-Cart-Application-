import express from "express";
import multer from "multer";
import { fetchProductsBySubcategory, uploadImage } from "../controllers/AddImagesController.js";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
router.get("/get-products/:sub_id", fetchProductsBySubcategory);
router.post("/add-image", upload.single("image"), uploadImage);

export default router;