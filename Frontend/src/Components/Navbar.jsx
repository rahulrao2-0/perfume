import React, { useState } from "react";

export default function Navbar({
  links = [
    { label: "Home", href: "#" },
    { label: "Collections", href: "/products" },
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
  ],
  activeLabel = "Home",
  cartCount = 2,
  onSearchClick,
  onAccountClick,
  onCartClick,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.header}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500&display=swap');

        .nb-link { position: relative; transition: color 0.25s ease; }
        .nb-link:hover { color: #E9D9AE !important; }
        .nb-icon-btn { transition: opacity 0.25s ease, transform 0.25s ease; }
        .nb-icon-btn:hover { opacity: 0.75; transform: translateY(-1px); }
        .nb-burger span { transition: all 0.3s ease; }

        @media (max-width: 860px) {
          .nb-links-desktop { display: none !important; }
          .nb-burger { display: flex !important; }
        }
        @media (min-width: 861px) {
          .nb-mobile-panel { display: none !important; }
        }
      `}</style>

      <div style={styles.bar}>
        {/* Logo */}
        <a href="#" style={styles.logoWrap}>
          <div style={styles.logoText}>MAISON</div>
          <div style={styles.logoSub}>HAUTE PARFUMERIE</div>
        </a>

        {/* Desktop links */}
        <nav className="nb-links-desktop" style={styles.linksDesktop}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nb-link"
              style={{
                ...styles.link,
                color: l.label === activeLabel ? "#C9A96E" : "#F5F1E8",
              }}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div style={styles.icons}>
          <button
            className="nb-icon-btn"
            style={styles.iconBtn}
            aria-label="Search"
            onClick={onSearchClick}
          >
            <SearchIcon />
          </button>
          <button
            className="nb-icon-btn"
            style={styles.iconBtn}
            aria-label="Account"
            onClick={onAccountClick}
          >
            <UserIcon />
          </button>
          <button
            className="nb-icon-btn"
            style={{ ...styles.iconBtn, position: "relative" }}
            aria-label="Cart"
            onClick={onCartClick}
          >
            <BagIcon />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>

          {/* Burger (mobile) */}
          <button
            className="nb-burger"
            style={styles.burger}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ ...styles.burgerLine, transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ ...styles.burgerLine, opacity: open ? 0 : 1 }} />
            <span style={{ ...styles.burgerLine, transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="nb-mobile-panel" style={styles.mobilePanel}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                ...styles.mobileLink,
                color: l.label === activeLabel ? "#C9A96E" : "#F5F1E8",
              }}
              onClick={() => setOpen(false)}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5F1E8" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5F1E8" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5F1E8" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

const styles = {
  header: {
    width: "100%",
    background: "#0A0A0A",
    fontFamily: "'Jost', sans-serif",
    borderBottom: "1px solid rgba(245,241,232,0.08)",
    position: "relative",
    zIndex: 50,
  },
  bar: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.15rem 2rem",
    boxSizing: "border-box",
  },
  logoWrap: {
    textDecoration: "none",
    lineHeight: 1,
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: "1.55rem",
    letterSpacing: "0.14em",
    color: "#D9BE87",
  },
  logoSub: {
    fontSize: "0.55rem",
    fontWeight: 400,
    letterSpacing: "0.28em",
    color: "#8A8477",
    marginTop: "0.25rem",
  },
  linksDesktop: {
    display: "flex",
    alignItems: "center",
    gap: "2.4rem",
  },
  link: {
    fontSize: "0.78rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textDecoration: "none",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    gap: "1.3rem",
  },
  iconBtn: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-9px",
    background: "#C9A96E",
    color: "#111111",
    fontSize: "0.62rem",
    fontWeight: 600,
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  burger: {
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "22px",
    padding: 0,
  },
  burgerLine: {
    width: "22px",
    height: "1.5px",
    background: "#F5F1E8",
    display: "block",
  },
  mobilePanel: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 2rem 1.5rem 2rem",
    gap: "1.1rem",
    borderTop: "1px solid rgba(245,241,232,0.08)",
  },
  mobileLink: {
    fontSize: "0.82rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textDecoration: "none",
  },
};