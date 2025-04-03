import express from 'express';
import { createProductItem } from '../controllers/ProductItemController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination:  (req, file, cb) => cb(null, '../../uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({storage});

router.post('/addProduct-item', upload.single("item_image"), createProductItem);

export default router;

