import Product from "../models/Product.js";

export const Products = async (req, res) => {
  try {
    const products = await Product.find().populate("category").lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};