import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AureliaHero.css';

export default function AureliaHero() {
  const containerRef = useRef(null);

  // Helper to split text into masked word spans for smooth reveal
  const renderSplitText = (text) => {
    return text.split(/\s+/).map((word, index, arr) => (
      <React.Fragment key={index}>
        <span className="hero-word">{word}</span>
        {index < arr.length - 1 && <span className="hero-space"> </span>}
      </React.Fragment>
    ));
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);

      const loader = q('#js-loader');
      const halfTop = q('#js-half-top');
      const halfBot = q('#js-half-bottom');
      const title = q('#js-title');
      const heroBgImg = q('.hero-bg-img');
      const navbar = q('#js-navbar');
      const heroCta = q('#js-hero-cta');
      const heroWords = q('.hero-word');

      // 1. Initial GSAP States
      gsap.set(title, { opacity: 0, letterSpacing: '0.4em' });
      gsap.set(heroBgImg, { scale: 1.18 });
      gsap.set(navbar, { opacity: 0, y: -25 }); // Navbar hidden initially
      gsap.set(heroWords, { yPercent: 100 });
      gsap.set(heroCta, { opacity: 0, y: 20 });

      // 2. Timeline Sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* 1. Loader Title Fade In */
      tl.to(title, {
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
      })
        /* 2. Letter-spacing Snap for MAISON */
        .to(title, {
          letterSpacing: '0.08em',
          duration: 0.8,
          ease: 'power3.inOut',
        }, '+=0.2')
        /* 3. PEEL — Top slides up, Bottom slides down */
        .to(halfTop, {
          yPercent: -100,
          duration: 1.3,
          ease: 'power3.inOut',
        }, '+=0.2')
        .to(halfBot, {
          yPercent: 100,
          duration: 1.3,
          ease: 'power3.inOut',
        }, '<')
        /* 4. Loader title fades away */
        .to(title, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: 'power2.in',
        }, '<0.15')
        /* 5. Perfume Background Image zoom settles 1.18 -> 1 */
        .to(heroBgImg, {
          scale: 1,
          duration: 1.5,
          ease: 'expo.out',
        }, '<')
        /* 6. Hide loader container */
        .set(loader, { display: 'none' }, '+=0.05')
        /* 7. Hero words rise inside overflow mask */
        .to(heroWords, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
        }, '<0.1')
        /* 8. Hero CTA Button fades in */
        .to(heroCta, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
        /* 9. NAVBAR REVEAL (Only AFTER hero peel finishes) */
        .to(navbar, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.4');
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="maison-wrapper">
      {/* ===== LOADER (MAISON SHUTTER) ===== */}
      <div className="loader" id="js-loader">
        <span className="half half--top" id="js-half-top"></span>
        <span className="half half--bottom" id="js-half-bottom"></span>

        <div className="loader__title" id="js-title">
          <span className="loader__word">MA</span>
          <span className="loader__dot"></span>
          <span className="loader__word">ISON</span>
        </div>
      </div>

      {/* ===== HERO STAGE ===== */}
      <div className="stage">
        <div className="frame">
          <img
            src="/img/hero.jpg"
            alt="Maison Luxury Perfume"
            className="hero-bg-img"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="shell">
          {/* NAVBAR — Hidden until hero peel finishes */}
          <header className="head" id="js-navbar">
            <a href="#" className="head__link head__contact">
              Bespoke Inquiry
            </a>

            <a href="#" className="head__logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
                />
                <path
                  fill="currentColor"
                  d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
              <p className="head__wordmark">MAISON</p>
              <span className="head__tag">HAUTE PARFUMERIE</span>
            </a>

            <nav className="head__nav">
              <a href="#featured" className="nav-link">
                Collections
              </a>
              <a href="#story" className="nav-link">
                Heritage
              </a>
              <span className="head__menu">
                <span>Explore</span>
                <span className="hamburger" aria-hidden="true">
                  <span className="hamburger__line hamburger__line--short"></span>
                  <span className="hamburger__line"></span>
                </span>
              </span>
            </nav>
          </header>

          {/* HERO CONTENT */}
          <div className="hero">
            <p className="hero__subtitle">HAUTE PARFUMERIE DE PARIS</p>
            <h1 className="hero__title">
              {renderSplitText('Essence of Timeless Elegance')}
            </h1>
            <p className="hero__sub">
              {renderSplitText(
                'Artisanal fragrances crafted with rare botanicals, alchemy, and pure passion.'
              )}
            </p>
            <div className="hero__cta" id="js-hero-cta">
              <a href="#featured" className="btn-primary">
                Discover Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}