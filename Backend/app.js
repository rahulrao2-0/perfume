/**
 * app.js  — Express server entry point
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./Routes/Products.js";
import productDetailsRoutes from "./Routes/ProductDetails.js";
import categoryRoutes from "./Routes/Category.js";
import reviewRoutes from "./Routes/Review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* ── Middleware (MUST come BEFORE routes) ── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://perfume-seven-drab.vercel.app"
    ],
    credentials: true,
  })
);
app.use(cookieParser());

/* ── Health check ── */
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Maison API is running 🌸" });
});

/* ── API Routes ── */
app.use("/api", productRoutes);        // GET /api/AllProducts/
app.use("/api", productDetailsRoutes); // GET /api/product/:id
app.use("/api", categoryRoutes);       // GET /api/categories, GET /api/categories/:id
app.use("/api", reviewRoutes);         // GET /api/reviews/product/:productId, POST /api/reviews

/* ── Connect DB then start server ── */
connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
