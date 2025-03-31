import express from 'express';
import { createItem } from '../controllers/ItemsController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '../../uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/add-item', upload.single("item_image"), createItem);


export default router; 