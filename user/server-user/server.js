import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from './src/routes/categoryRoutes.js';
import ProductRoutes from './src/routes/ProductRoutes.js';
import ItemsRoutes from './src/routes/ItemsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get absolute path for the "uploads" directory (outside project)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "../../uploads");

// ✅ Serve static files (Ensure images are accessible)
app.use("/uploads", express.static(uploadsPath));

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use('/products', ProductRoutes);
app.use('/items', ItemsRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
