import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { setUser, setHod } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/index/login`, {
        email,
        password,
      });

      const { token, output } = response.data;
      console.log("Login successful:", output);

      // Save token
      Cookies.set("jwtToken", token); // expires in 1 day

      // Set user role
      if (onLogin) onLogin();

      // Only store extra info if available (i.e. not admin)
      if (output.email) {
        localStorage.setItem("userEmail", output.email);
        localStorage.setItem("userName", output.name);
        localStorage.setItem("designation", output.designation);
        localStorage.setItem("empid", output.code);
        localStorage.setItem("courseNames", JSON.stringify(output.courseNames));
      }

      // Route based on designation
      if (output.designation === "admin") {
        setUser("admin");
        setHod(false);
        navigate("/admin");
      } else if  (output.designation === "HOD"){
        setUser("HOD");
        setHod(true);
        navigate("/dashboard");
      } else {
        setUser("Professor");
        setHod(false);
        navigate("/dashboard");
      }

      // Reset fields
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
