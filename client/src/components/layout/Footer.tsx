import React from "react";
import "./Footer.css"

const Footer: React.FC = () => {
  return (
      <footer className="footer">
       <div className="footer-content">
        <p>
        &copy; {new Date().getFullYear()} MAHE. All Rights
        Reserved.
        </p>
        <div className="footer-links">
            <a href="/">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
       </div>
      </footer>
  );
};

export default Footer;
