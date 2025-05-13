import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = false; // Replace with actual login state

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Ecomm</Link>
        </div>

        <button className="hamburger" onClick={handleToggle}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/cart"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart
          </Link>
          {isLoggedIn ? (
            <Link
              to="/signout"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              to="/signin"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
