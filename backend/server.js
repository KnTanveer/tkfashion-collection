import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

// console.log("Cloudinary config check:");
// console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log(
//     "API_KEY exists:",
//     Boolean(process.env.CLOUDINARY_API_KEY)
// );
// console.log(
//     "API_SECRET exists:",
//     Boolean(process.env.CLOUDINARY_API_SECRET)
// );

const app = express();

app.use(cors({
    origin: [
        "https://tkfashioncollection.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true
}));

// Routes
app.use("/api/products", productRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("E-commerce API is running");
});


// Connect MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT || 5001, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT || 5001}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });