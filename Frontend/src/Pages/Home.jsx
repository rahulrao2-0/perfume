import React, { useEffect, useState } from "react";
import AureliaHero from "../AureliaHero";

import FeaturedPerfumes from "../Components/FeaturedPerfumes";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import { getAllProducts } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load products from backend API:", err);
        setError("Could not load products from backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: "#0a0807", color: "#FAF0ED", minHeight: "100vh" }}>
      {/* ── Aurelia Animated Hero (includes built-in Navbar revealing after peel) ── */}
      <AureliaHero />

      {/* ── Featured Products Grid ── */}
      <main id="featured">
        <FeaturedPerfumes>
          {loading ? (
            <div style={{ textTransform: "uppercase", letterSpacing: "2px", color: "#C9A96E", textAlign: "center", gridColumn: "1 / -1", padding: "3rem 0" }}>
              Loading Collections from Backend...
            </div>
          ) : error ? (
            <div style={{ color: "#e74c3c", textAlign: "center", gridColumn: "1 / -1", padding: "3rem 0" }}>
              {error}
            </div>
          ) : products.length === 0 ? (
            <div style={{ color: "rgba(245,241,232,0.6)", textAlign: "center", gridColumn: "1 / -1", padding: "3rem 0" }}>
              No products found.
            </div>
          ) : (
            products.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))
          )}
        </FeaturedPerfumes>
      </main>

      {/* ── Footer ── */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}