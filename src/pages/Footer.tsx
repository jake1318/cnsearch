import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Sui Mind. All rights reserved.</p>
    </footer>
  );
}
