import Review from "../models/Review.js";
import Product from "../models/Product.js";

/**
 * GET reviews for a given product ID
 */
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .lean();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST create a new review for a product and update product rating/totalReviews
 */
export const createReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ error: "Missing required fields (productId, userName, rating, comment)" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = await Review.create({
      product: productId,
      userName,
      rating: Number(rating),
      comment,
    });

    /* Recalculate average rating & total reviews for the product */
    const allReviews = await Review.find({ product: productId });
    const totalReviews = allReviews.length;
    const avgRating = Number(
      (allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    );

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      totalReviews: totalReviews,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
      updatedProductStats: { rating: avgRating, totalReviews },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
