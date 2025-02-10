import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import CSS for styling

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.jpeg" alt="Logo" className="logo-img" />
        </Link>

        <div className="auth">
          {isLoggedIn ? (
            <button onClick={onLogout} className="auth-button">
              Logout
            </button>
          ) : (
            <Link to="/login"> Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
