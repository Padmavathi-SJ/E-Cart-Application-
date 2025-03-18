import express from 'express'
import { getAllCategories } from '../contollers/categoryController.js'

const router=express.Router();

router.get("/categories", getAllCategories);

export default router;