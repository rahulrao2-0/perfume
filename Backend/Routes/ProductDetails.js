import express from "express";
import { ProductDetails } from "../Controllers/ProductDetails.js";

const router = express.Router();

router.get("/product/:id", ProductDetails);

export default router;