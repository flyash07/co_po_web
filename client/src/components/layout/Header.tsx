import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";


interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.jpeg" alt="Logo" className="logo-img" />
        </Link>

        <div className="auth">
          <button
            onClick={isLoggedIn ? onLogout : () => navigate("/login")}
            className="auth-button"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
