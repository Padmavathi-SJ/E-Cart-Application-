import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; 
import authRoutes from "./src/routes/authRoutes.js";
import AllCategoryRoutes from './src/routes/AllCategories.js';
import AddProductRoutes from './src/routes/AddProductRouter.js';
import AddImagesRoutes from './src/routes/AddImagesRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(bodyParser.json());

app.use("/admin", authRoutes);
app.use("/admin", AllCategoryRoutes);
app.use("/admin", AddProductRoutes);
app.use("/admin", AddImagesRoutes);

const PORT = process.env.ADMIN_PORT || 5001; // Change the port to 5001

app.listen(PORT, () => {
    console.log(`✅ Admin Server running on port ${PORT}`);
});
