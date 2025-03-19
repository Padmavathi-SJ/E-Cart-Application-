import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import AllCategoryRoutes from './src/routes/AllCategories.js';
import AddProductRoutes from './src/routes/AddProductRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", authRoutes);
app.use("/admin", AllCategoryRoutes);
app.use("/admin", AddProductRoutes);

const PORT = process.env.ADMIN_PORT || 5001; // Change the port to 5001

app.listen(PORT, () => {
    console.log(`✅ Admin Server running on port ${PORT}`);
});
