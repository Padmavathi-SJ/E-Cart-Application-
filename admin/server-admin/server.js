import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; 
import path from "path";
import authRoutes from "./src/routes/authRoutes.js";
import AllCategoryRoutes from './src/routes/AllCategories.js';
import ProductRoutes from './src/routes/ProductRouter.js';
import ItemsRoutes from './src/routes/ItemsRouter.js';
import { fileURLToPath } from "url";
import morgan from 'morgan';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(bodyParser.json());
app.use(morgan("dev"));

// Serve images from the uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/admin", authRoutes);
app.use("/admin", AllCategoryRoutes);
app.use("/admin", ProductRoutes);
app.use("/admin", ItemsRoutes);

const PORT = process.env.ADMIN_PORT || 5001; // Change the port to 5001

app.listen(PORT, () => {
    console.log(`✅ Admin Server running on port ${PORT}`);
});