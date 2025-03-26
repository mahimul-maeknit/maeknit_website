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
    { path: "/onboarding", label: "ONBOARDING" },
    { path: "/draw", label: "DRAW" }
  ];

  return (
    <div className="top-nav-container">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <nav
        className={`top-nav ${menuOpen ? "active" : "hidden"} ${
          isHome ? "home-nav" : "other"
        }`}
      >
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
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/assets/maeknit-no-bg-logo.png"
            alt="Logo"
            className="logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
