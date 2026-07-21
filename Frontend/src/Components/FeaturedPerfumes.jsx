import React from "react";

/**
 * Usage:
 * <FeaturedPerfumes>
 *   <ProductCard ... />
 *   <ProductCard ... />
 *   <ProductCard ... />
 *   <ProductCard ... />
 * </FeaturedPerfumes>
 *
 * Pass your product cards as children — this component only renders
 * the section header and the grid container that holds them.
 */
export default function FeaturedPerfumes({ children }) {
  return (
    <section style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        .fp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
        }
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .fp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.header}>
        <div style={styles.eyebrow}>FEATURED PERFUMES</div>
        <h2 style={styles.heading}>Our Handpicked Essentials</h2>
        <div style={styles.diamondRow}>
          <span style={styles.line} />
          <span style={styles.diamond} />
          <span style={styles.line} />
        </div>
        <p style={styles.subtitle}>
          Timeless scents, crafted with passion and precision.
        </p>
      </div>

      <div className="fp-grid" style={styles.grid}>
        {children}
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    background: "#0a0807",
    padding: "6rem 3rem",
    boxSizing: "border-box",
    fontFamily: "'Jost', sans-serif",
    borderTop: "1px solid rgba(201,169,110,0.1)",
  },
  header: {
    maxWidth: "700px",
    margin: "0 auto 3.5rem auto",
    textAlign: "center",
  },
  eyebrow: {
    fontSize: "0.72rem",
    fontWeight: 500,
    letterSpacing: "0.3em",
    color: "#C9A96E",
    textTransform: "uppercase",
    marginBottom: "0.9rem",
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: "2.6rem",
    color: "#F8F5EC",
    margin: 0,
  },
  diamondRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    margin: "1.1rem auto",
  },
  line: {
    width: "36px",
    height: "1px",
    background: "rgba(201,169,110,0.55)",
    display: "inline-block",
  },
  diamond: {
    width: "7px",
    height: "7px",
    background: "#C9A96E",
    transform: "rotate(45deg)",
    display: "inline-block",
  },
  subtitle: {
    fontWeight: 300,
    fontSize: "0.98rem",
    color: "rgba(245,241,232,0.5)",
    margin: "1rem 0 0 0",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "340px",
  },
};