import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        .pc-card {
          background: #111111;
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.42s cubic-bezier(0.22,0.61,0.36,1),
                      border-color 0.4s ease,
                      box-shadow 0.42s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          font-family: 'Jost', sans-serif;
        }
        .pc-card:hover {
          transform: translateY(-10px);
          border-color: rgba(201,169,110,0.55);
          box-shadow: 0 20px 45px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,169,110,0.12);
        }
        .pc-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #0d0d0d;
        }
        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.22,0.61,0.36,1);
          display: block;
        }
        .pc-card:hover .pc-img {
          transform: scale(1.07);
        }
        .pc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,7,0.75) 0%, transparent 55%);
          pointer-events: none;
        }
        .pc-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(10,8,7,0.85);
          color: #C9A96E;
          border: 1px solid #C9A96E;
          padding: 0.28rem 0.75rem;
          font-size: 0.6rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
        }
        .pc-quick-btn {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          background: rgba(201,169,110,0.92);
          color: #111;
          border: none;
          padding: 0.55rem 1.6rem;
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          white-space: nowrap;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .pc-card:hover .pc-quick-btn {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .pc-content {
          padding: 1.5rem 1.6rem 1.7rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }
        .pc-category {
          font-size: 0.62rem;
          letter-spacing: 2.5px;
          color: #C9A96E;
          text-transform: uppercase;
          font-weight: 500;
        }
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 500;
          color: #F5F1E8;
          line-height: 1.2;
          margin: 0.1rem 0;
        }
        .pc-notes {
          font-size: 0.78rem;
          color: rgba(245,241,232,0.5);
          font-weight: 300;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        .pc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(245,241,232,0.07);
        }
        .pc-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #F5F1E8;
        }
        .pc-acquire-btn {
          background: transparent;
          border: 1px solid rgba(245,241,232,0.25);
          color: #F5F1E8;
          padding: 0.45rem 1.1rem;
          font-size: 0.68rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .pc-acquire-btn:hover {
          background: #C9A96E;
          border-color: #C9A96E;
          color: #111;
        }
      `}</style>

      <div className="pc-card" onClick={handleClick} id={`product-card-${product._id || product.id}`}>
        <div className="pc-img-wrap">
          <img
            className="pc-img"
            src={product.image || (product.images && product.images[0]) || "/img/prod1.jpg"}
            alt={product.name}
            loading="lazy"
          />
          <div className="pc-overlay" />
          {product.badge && <span className="pc-badge">{product.badge}</span>}
          <button
            className="pc-quick-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id || product.id}`);
            }}
          >
            View Details
          </button>
        </div>

        <div className="pc-content">
          {product.category && (
            <span className="pc-category">
              {typeof product.category === "object" ? product.category?.name : product.category}
            </span>
          )}
          <h3 className="pc-name">{product.name}</h3>
          {product.notes && <p className="pc-notes">{product.notes}</p>}
          {product.description && !product.notes && (
            <p className="pc-notes">{product.description}</p>
          )}
          <div className="pc-footer">
            <span className="pc-price">
              {typeof product.price === "number"
                ? `$${product.price.toLocaleString()}`
                : product.price}
            </span>
            <button
              className="pc-acquire-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product._id || product.id}`);
              }}
            >
              Acquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}