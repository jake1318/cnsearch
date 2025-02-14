import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Create a minimal file or incorporate into styles.css

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Sui Mind - AI Meets Blockchain</h1>
        <p className="hero-subtitle">
          Revolutionizing AI Applications on the Sui Network
        </p>
        <Link to="/search">
          <button className="cta-button">Start Searching</button>
        </Link>
      </section>
      <section className="combined-section">
        <h2 className="section-title">Our Application Stack</h2>
        <div className="feature-grid">
          <Link to="/search" className="feature-card">
            <div className="feature">
              <h3 className="feature-title">Mind Search</h3>
              <p className="feature-description">
                AI, YouTube, and Web Search in one unified search.
              </p>
            </div>
          </Link>
          <Link to="/swap" className="feature-card">
            <div className="feature">
              <h3 className="feature-title">Mind Swap</h3>
              <p className="feature-description">
                Token swapping on the Sui network coming soon.
              </p>
            </div>
          </Link>
          <Link to="/dex" className="feature-card">
            <div className="feature">
              <h3 className="feature-title">Mind DEX</h3>
              <p className="feature-description">
                Decentralized Exchange functionalities coming soon.
              </p>
            </div>
          </Link>
          <Link to="/lp-pool" className="feature-card">
            <div className="feature">
              <h3 className="feature-title">LP Pools</h3>
              <p className="feature-description">
                Liquidity pool features coming soon.
              </p>
            </div>
          </Link>
          <Link to="/marketplace" className="feature-card">
            <div className="feature">
              <h3 className="feature-title">Marketplace</h3>
              <p className="feature-description">
                AI-driven services marketplace coming soon.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
