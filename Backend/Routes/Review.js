import express from "express";
import { getReviewsByProduct, createReview } from "../Controllers/Review.js";

const router = express.Router();

router.get("/reviews/product/:productId", getReviewsByProduct);
router.post("/reviews", createReview);

export default router;
