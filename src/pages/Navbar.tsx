import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Sui Mind</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/swap">Swap</Link>
          <Link to="/dex">DEX</Link>
          <Link to="/lp-pool">LP Pool</Link>
          <Link to="/marketplace">Marketplace</Link>
        </div>
      </nav>
    </header>
  );
}
