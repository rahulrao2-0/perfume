import Product from "../models/Product.js";

export const ProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .lean();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};