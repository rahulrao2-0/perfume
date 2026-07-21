import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getProductById } from "../api/products";

const STATIC_REVIEWS = [
  {
    id: "r1",
    author: "Isabelle M.",
    rating: 5,
    date: "June 2026",
    body: "Absolutely breathtaking. The longevity is unmatched — I received compliments the entire day. This is my signature scent now.",
  },
  {
    id: "r2",
    author: "James K.",
    rating: 5,
    date: "May 2026",
    body: "Worth every penny. The bottle itself is a work of art and the fragrance evolves beautifully over 12+ hours.",
  },
  {
    id: "r3",
    author: "Priya S.",
    rating: 4,
    date: "April 2026",
    body: "Luxurious and refined. The opening is bold but settles into the most elegant drydown I've experienced.",
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#C9A96E" : "none"}
          stroke="#C9A96E"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState(STATIC_REVIEWS);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, body: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        if (data && (data._id || data.id)) {
          setProduct(data);
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          setError("Product details not found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching product details from API:", err);
        setError("Failed to fetch product details from server.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.name, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2500);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.body.trim()) return;
    setReviews((prev) => [
      {
        id: `r${Date.now()}`,
        ...newReview,
        date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      },
      ...prev,
    ]);
    setNewReview({ author: "", rating: 5, body: "" });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div style={{ background: "#0a0807", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "4px", fontSize: "0.85rem", textTransform: "uppercase" }}>
          Loading Fragrance Details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ background: "#0a0807", minHeight: "100vh", color: "#F5F1E8", fontFamily: "'Jost', sans-serif" }}>
        <Navbar links={[{ label: "Home", href: "/" }, { label: "Collections", href: "/#featured" }]} />
        <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A96E", marginBottom: "1rem" }}>
            {error || "Product Not Found"}
          </h2>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#C9A96E", border: "none", color: "#111", padding: "0.8rem 1.8rem",
              fontFamily: "'Jost', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer"
            }}
          >
            Return to Boutique
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : ["/img/prod1.jpg"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .pd-root {
          background: #0a0807;
          min-height: 100vh;
          color: #F5F1E8;
          font-family: 'Jost', sans-serif;
        }

        .pd-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .pd-main { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.2rem 4rem; }
        }

        .pd-gallery { display: flex; flex-direction: column; gap: 1rem; position: sticky; top: 1.5rem; }
        .pd-main-img-wrap {
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 2px;
        }
        .pd-main-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
        .pd-main-img-wrap:hover .pd-main-img { transform: scale(1.04); }

        .pd-thumbs { display: flex; gap: 0.75rem; }
        .pd-thumb {
          width: 72px; height: 90px; object-fit: cover;
          border: 1.5px solid transparent;
          border-radius: 1px;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.25s ease, border-color 0.25s ease;
          flex-shrink: 0;
        }
        .pd-thumb.active { opacity: 1; border-color: #C9A96E; }
        .pd-thumb:hover { opacity: 0.9; }

        .pd-info { display: flex; flex-direction: column; gap: 0; }

        .pd-eyebrow {
          font-size: 0.68rem; letter-spacing: 3px; color: #C9A96E;
          text-transform: uppercase; font-weight: 500; margin-bottom: 0.6rem;
        }
        .pd-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 500; line-height: 1.1;
          color: #F8F5EC; margin: 0 0 0.8rem 0;
        }
        .pd-rating-row {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.8rem; color: rgba(245,241,232,0.55);
          margin-bottom: 1.2rem;
        }
        .pd-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; color: #F5F1E8; margin-bottom: 1.4rem;
        }

        .pd-divider { height: 1px; background: rgba(245,241,232,0.08); margin: 1.5rem 0; }

        .pd-desc {
          font-size: 0.95rem; line-height: 1.85;
          color: rgba(245,241,232,0.7); font-weight: 300;
          margin-bottom: 1.5rem;
        }

        .pd-size-label {
          font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,241,232,0.5); margin-bottom: 0.75rem;
        }
        .pd-sizes { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.8rem; }
        .pd-size-btn {
          padding: 0.5rem 1.1rem;
          border: 1px solid rgba(245,241,232,0.2);
          background: transparent; color: #F5F1E8;
          font-size: 0.75rem; letter-spacing: 1.5px;
          cursor: pointer; font-family: 'Jost', sans-serif;
          transition: all 0.25s ease;
        }
        .pd-size-btn:hover { border-color: rgba(201,169,110,0.6); color: #C9A96E; }
        .pd-size-btn.selected { background: #C9A96E; border-color: #C9A96E; color: #111; }

        .pd-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .pd-add-btn {
          flex: 1; min-width: 160px;
          background: #C9A96E; color: #111;
          border: 1px solid #C9A96E;
          padding: 1rem 2rem; font-size: 0.8rem;
          letter-spacing: 2.5px; text-transform: uppercase;
          cursor: pointer; font-family: 'Jost', sans-serif;
          font-weight: 500;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .pd-add-btn:hover { background: #e0c080; box-shadow: 0 0 22px rgba(201,169,110,0.35); }
        .pd-share-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: transparent;
          border: 1px solid rgba(245,241,232,0.25);
          color: #F5F1E8; padding: 1rem 1.4rem;
          font-size: 0.75rem; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .pd-share-btn:hover { border-color: #C9A96E; color: #C9A96E; }
        .pd-share-msg { font-size: 0.75rem; color: #C9A96E; letter-spacing: 1px; align-self: center; }

        .pd-back-btn {
          background: none; border: none; color: rgba(245,241,232,0.45);
          font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; font-family: 'Jost', sans-serif;
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0; transition: color 0.25s ease;
          margin-bottom: 2rem;
        }
        .pd-back-btn:hover { color: #C9A96E; }

        .pd-reviews {
          max-width: 1200px; margin: 0 auto;
          padding: 3rem 2rem 5rem;
          border-top: 1px solid rgba(245,241,232,0.07);
        }
        @media (max-width: 860px) { .pd-reviews { padding: 2.5rem 1.2rem 4rem; } }

        .pd-rev-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 500;
          color: #F8F5EC; margin-bottom: 2.5rem;
        }
        .pd-rev-grid {
          display: grid; grid-template-columns: 1.4fr 1fr;
          gap: 4rem; align-items: start;
        }
        @media (max-width: 860px) { .pd-rev-grid { grid-template-columns: 1fr; gap: 3rem; } }

        .pd-rev-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .pd-rev-card {
          border: 1px solid rgba(245,241,232,0.08);
          border-radius: 2px; padding: 1.5rem 1.75rem;
          background: #111;
        }
        .pd-rev-author { font-weight: 500; font-size: 0.9rem; color: #F5F1E8; margin-bottom: 0.25rem; }
        .pd-rev-meta { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.75rem; }
        .pd-rev-date { font-size: 0.72rem; color: rgba(245,241,232,0.4); }
        .pd-rev-body { font-size: 0.88rem; line-height: 1.75; color: rgba(245,241,232,0.65); font-weight: 300; }

        .pd-rev-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .pd-rev-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; color: #F8F5EC; margin-bottom: 0.3rem;
        }
        .pd-input, .pd-textarea {
          background: rgba(245,241,232,0.04);
          border: 1px solid rgba(245,241,232,0.15);
          color: #F5F1E8; padding: 0.85rem 1rem;
          font-family: 'Jost', sans-serif; font-size: 0.88rem;
          outline: none; transition: border-color 0.25s ease;
          width: 100%;
        }
        .pd-input:focus, .pd-textarea:focus { border-color: #C9A96E; }
        .pd-textarea { resize: vertical; min-height: 110px; }
        .pd-star-select { display: flex; gap: 6px; }
        .pd-star-sel-btn {
          background: none; border: none; cursor: pointer; padding: 2px;
          transition: transform 0.15s ease;
        }
        .pd-star-sel-btn:hover { transform: scale(1.2); }
        .pd-submit-btn {
          background: #C9A96E; border: 1px solid #C9A96E; color: #111;
          padding: 0.9rem 2rem; font-family: 'Jost', sans-serif;
          font-weight: 500; font-size: 0.78rem; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.3s ease;
        }
        .pd-submit-btn:hover { background: #e0c080; }
        .pd-submit-success {
          font-size: 0.8rem; color: #C9A96E; letter-spacing: 1px;
        }
      `}</style>

      <div className="pd-root">
        <Navbar
          links={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/#featured" },
            { label: "About Us", href: "/#story" },
            { label: "Contact", href: "/#footer" },
          ]}
        />

        <div className="pd-main">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-img-wrap">
              <img className="pd-main-img" src={images[activeImg]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    className={`pd-thumb${activeImg === i ? " active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>

            <div className="pd-eyebrow">{product.brand || "Maison"}</div>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating-row">
              <StarRating rating={product.rating || 4.8} />
              <span>{(product.rating || 4.8).toFixed(1)}</span>
              <span>·</span>
              <span>{product.totalReviews || reviews.length} reviews</span>
            </div>

            <div className="pd-price">
              ${product.price ? product.price.toLocaleString() : "0"}
            </div>

            <div className="pd-divider" />

            <p className="pd-desc">{product.description}</p>

            <div className="pd-divider" />

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <>
                <div className="pd-size-label">Select Size</div>
                <div className="pd-sizes">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`pd-size-btn${selectedSize === sz ? " selected" : ""}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="pd-actions">
              <button className="pd-add-btn" id="add-to-cart-btn">
                Add to Collection
              </button>
              <button className="pd-share-btn" onClick={handleShare} id="share-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
              {shareMsg && <span className="pd-share-msg">{shareMsg}</span>}
            </div>

            {product.stock !== undefined && (
              <p style={{ fontSize: "0.72rem", color: "rgba(245,241,232,0.35)", letterSpacing: "1px", marginTop: "0.5rem" }}>
                {product.stock > 0 ? `${product.stock} units available` : "Out of stock"}
              </p>
            )}
          </div>
        </div>

        {/* ── Reviews Section ── */}
        <div className="pd-reviews" id="reviews">
          <h2 className="pd-rev-heading">Connoisseur Reviews</h2>
          <div className="pd-rev-grid">
            <div className="pd-rev-list">
              {reviews.map((r) => (
                <div key={r.id} className="pd-rev-card">
                  <div className="pd-rev-author">{r.author}</div>
                  <div className="pd-rev-meta">
                    <StarRating rating={r.rating} />
                    <span className="pd-rev-date">{r.date}</span>
                  </div>
                  <p className="pd-rev-body">{r.body}</p>
                </div>
              ))}
            </div>

            <form className="pd-rev-form" onSubmit={handleReviewSubmit} id="review-form">
              <div className="pd-rev-form-title">Leave a Review</div>

              <input
                className="pd-input"
                type="text"
                placeholder="Your name"
                value={newReview.author}
                onChange={(e) => setNewReview((p) => ({ ...p, author: e.target.value }))}
                required
                id="review-author"
              />

              <div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "rgba(245,241,232,0.45)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Rating
                </div>
                <div className="pd-star-select">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="pd-star-sel-btn"
                      onClick={() => setNewReview((p) => ({ ...p, rating: n }))}
                      id={`star-btn-${n}`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={n <= newReview.rating ? "#C9A96E" : "none"}
                        stroke="#C9A96E"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="pd-textarea"
                placeholder="Share your experience..."
                value={newReview.body}
                onChange={(e) => setNewReview((p) => ({ ...p, body: e.target.value }))}
                required
                id="review-body"
              />

              <button type="submit" className="pd-submit-btn" id="submit-review-btn">
                Submit Review
              </button>

              {reviewSubmitted && (
                <p className="pd-submit-success">✓ Thank you — your review has been added.</p>
              )}
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}