import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
