/**
 * seed.js
 * ─────────────────────────────────────────────────────────────
 * Seeds Categories, Products (linked via category ObjectId),
 * and Reviews (linked via product ObjectId).
 * ─────────────────────────────────────────────────────────────
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Review from "./models/Review.js";
import categoriesData from "./data/categories.js";
import productsData from "./data/products.js";
import reviewsData from "./data/reviews.js";

dotenv.config();

const FRESH = process.argv.includes("--fresh");

async function seed() {
  try {
    /* 1. Connect to MongoDB */
    await mongoose.connect(process.env.MONGODB_URL, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("✅ Connected to MongoDB");

    /* 2. Clear collections if --fresh flag is passed */
    if (FRESH) {
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Review.deleteMany({});
      console.log("🗑️  Cleared existing Categories, Products, and Reviews");
    }

    /* Check if categories already exist */
    const existingCatCount = await Category.countDocuments();
    if (existingCatCount > 0 && !FRESH) {
      console.log(`ℹ️  ${existingCatCount} categories already exist. Use --fresh to reset.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    /* 3. Insert Categories */
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log(`🏷️  Seeded ${insertedCategories.length} Categories:`);
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
      console.log(`   - ${cat.name} (${cat._id})`);
    });

    /* 4. Prepare & Insert Products with category ObjectId reference */
    const productsToInsert = productsData.map((p) => {
      const { categoryName, ...rest } = p;
      return {
        ...rest,
        category: categoryMap[categoryName] || insertedCategories[0]._id,
      };
    });

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`🌱 Seeded ${insertedProducts.length} Products with Category ObjectIds:`);
    const productMap = {};
    insertedProducts.forEach((p) => {
      productMap[p.name] = p;
      console.log(`   - ${p.name} [Category ID: ${p.category}] -> Product ID: ${p._id}`);
    });

    /* 5. Prepare & Insert Reviews with product ObjectId reference */
    const reviewsToInsert = reviewsData.map((r) => {
      const { productName, ...rest } = r;
      const prod = productMap[productName] || insertedProducts[0];
      return {
        ...rest,
        product: prod._id,
      };
    });

    const insertedReviews = await Review.insertMany(reviewsToInsert);
    console.log(`⭐ Seeded ${insertedReviews.length} Reviews with Product ObjectIds`);

    /* 6. Recalculate and update ratings and totalReviews for each product */
    for (const prod of insertedProducts) {
      const prodReviews = insertedReviews.filter(
        (r) => r.product.toString() === prod._id.toString()
      );
      const totalReviews = prodReviews.length;
      const avgRating =
        totalReviews > 0
          ? Number((prodReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
          : 0;

      await Product.findByIdAndUpdate(prod._id, {
        rating: avgRating,
        totalReviews: totalReviews,
      });
      console.log(`   Updated ${prod.name}: Rating=${avgRating}, Reviews=${totalReviews}`);
    }

    console.log("\n🎉 Database seeding complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
