import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = page.toLowerCase() === "home";

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/services", label: "SERVICES" },
    { path: "/work", label: "OUR WORK" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
    { path: "/onboarding", label: "ONBOARDING" }
  ];

  return (
    <div className="top-nav-container">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <nav className={`top-nav ${menuOpen ? "active" : "hidden"} ${isHome ? "home-nav" : "other"}`}>
        {navItems
          .filter((item) => item.label.toLowerCase() !== page.toLowerCase())
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
      </nav>

      <div className="logo-container">
        <img src="/assets/maeknit-no-bg-logo.png" alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Navbar;
