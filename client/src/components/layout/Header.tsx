import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from 'axios';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/index/logout"); // No body needed
  
      console.log(response.data.message); // Should print: "Logged out successfully"
  
      onLogout(); // Update login state in App.tsx
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.jpeg" alt="Logo" className="logo-img" />
        </Link>

        <div className="auth">
          <button
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
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
