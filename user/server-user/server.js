import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from './src/routes/categoryRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
