import React, { useState } from "react";

export default function Footer({
  quickLinks = [
    { label: "Home", href: "#" },
    { label: "Collections", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  customerCare = [
    { label: "My Orders", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  onSubscribe,
  year = new Date().getFullYear(),
}) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe && onSubscribe(email);
    setEmail("");
  };

  return (
    <footer style={styles.footer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Jost:wght@300;400;500&display=swap');

        .ft-link { transition: color 0.25s ease; }
        .ft-link:hover { color: #E9D9AE !important; }
        .ft-social { transition: all 0.25s ease; }
        .ft-social:hover { color: #141210 !important; background: #C9A96E !important; border-color: #C9A96E !important; }
        .ft-sub-btn { transition: background 0.25s ease; }
        .ft-sub-btn:hover { background: #E9D9AE !important; }
        .ft-email:focus { outline: none; border-color: #C9A96E !important; }

        @media (max-width: 860px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2.5rem 1.5rem !important; }
        }
        @media (max-width: 540px) {
          .ft-grid { grid-template-columns: 1fr !important; }
          .ft-bottom { flex-direction: column !important; gap: 0.75rem !important; text-align: center !important; }
        }
      `}</style>

      <div style={styles.top}>
        <div className="ft-grid" style={styles.grid}>
          {/* Brand */}
          <div>
            <div style={styles.logoText}>MAISON</div>
            <div style={styles.logoSub}>HAUTE PARFUMERIE</div>
            <p style={styles.about}>
              Luxury perfumes crafted with passion, elegance and the finest
              ingredients.
            </p>
            <div style={styles.socials}>
              <a className="ft-social" href="#" aria-label="Instagram" style={styles.socialBtn}><InstagramIcon /></a>
              <a className="ft-social" href="#" aria-label="Facebook" style={styles.socialBtn}><FacebookIcon /></a>
              <a className="ft-social" href="#" aria-label="Twitter" style={styles.socialBtn}><TwitterIcon /></a>
              <a className="ft-social" href="#" aria-label="YouTube" style={styles.socialBtn}><YoutubeIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={styles.colHeading}>QUICK LINKS</div>
            <ul style={styles.list}>
              {quickLinks.map((l) => (
                <li key={l.label} style={styles.listItem}>
                  <a className="ft-link" href={l.href} style={styles.link}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <div style={styles.colHeading}>CUSTOMER CARE</div>
            <ul style={styles.list}>
              {customerCare.map((l) => (
                <li key={l.label} style={styles.listItem}>
                  <a className="ft-link" href={l.href} style={styles.link}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div style={styles.colHeading}>NEWSLETTER</div>
            <p style={styles.newsletterCopy}>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form style={styles.subscribeRow} onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ft-email"
                style={styles.emailInput}
              />
              <button type="submit" className="ft-sub-btn" style={styles.subBtn} aria-label="Subscribe">
                <ArrowIcon />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      <div className="ft-bottom" style={styles.bottom}>
        <span>© {year} Maison Haute Parfumerie. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M15 8h-2a2 2 0 0 0-2 2v10M8 13h6" />
      <path d="M15 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1a4.1 4.1 0 0 0 3.3 4 4 4 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

const styles = {
  footer: {
    width: "100%",
    background: "#0A0A0A",
    color: "#C9C4B8",
    fontFamily: "'Jost', sans-serif",
  },
  top: {
    padding: "4rem 3rem 3rem 3rem",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr 1fr 1.3fr",
    gap: "2.5rem",
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: "1.4rem",
    letterSpacing: "0.14em",
    color: "#D9BE87",
    lineHeight: 1,
  },
  logoSub: {
    fontSize: "0.5rem",
    fontWeight: 400,
    letterSpacing: "0.28em",
    color: "#8A8477",
    marginTop: "0.3rem",
  },
  about: {
    fontSize: "0.85rem",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "#9C9789",
    margin: "1.1rem 0 1.4rem 0",
    maxWidth: "260px",
  },
  socials: {
    display: "flex",
    gap: "0.7rem",
  },
  socialBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid rgba(245,241,232,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F5F1E8",
    textDecoration: "none",
  },
  colHeading: {
    fontSize: "0.72rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    color: "#F5F1E8",
    marginBottom: "1.3rem",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  listItem: {},
  link: {
    fontSize: "0.85rem",
    fontWeight: 300,
    color: "#C9C4B8",
    textDecoration: "none",
  },
  newsletterCopy: {
    fontSize: "0.85rem",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "#9C9789",
    margin: "0 0 1.3rem 0",
  },
  subscribeRow: {
    display: "flex",
    border: "1px solid rgba(245,241,232,0.25)",
  },
  emailInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    padding: "0.75rem 1rem",
    color: "#F5F1E8",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.85rem",
  },
  subBtn: {
    background: "#C9A96E",
    border: "none",
    width: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  divider: {
    borderTop: "1px solid rgba(245,241,232,0.08)",
  },
  bottom: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1.5rem 3rem",
    display: "flex",
    justifyContent: "center",
    fontSize: "0.8rem",
    color: "#8A8477",
  },
};