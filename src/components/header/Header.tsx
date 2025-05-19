import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    logout();
  };

  const handleSignInRedirect = () => {
    setIsMenuOpen(false);
    navigate('/signin', { state: { from: location }, replace: true });
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Ecomm</Link>
        </div>

        <button className="hamburger" onClick={handleToggle}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
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
            Cart ({cartItems?.length ?? 0})
          </Link>
          {isAuthenticated ? (
            <a className="nav-link" onClick={handleSignOut}>
              Sign Out
            </a>
          ) : (
            <a className="nav-link" onClick={handleSignInRedirect}>
              Sign In
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
