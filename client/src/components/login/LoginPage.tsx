/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import "./LoginPage.css";

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { setUser } = useUser();
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
      const response = await axios.post(
        "http://localhost:8080/index/login",
        { email, password }
      );

      const {token, output} = response.data;
      console.log("Login successful:", output);

      // Store course names and user role/info
      localStorage.setItem("courseNames", JSON.stringify(output.courseNames));
      localStorage.setItem("userEmail", output.email);
      localStorage.setItem("userName", output.name);

      setUser("Professor"); // You can dynamically determine role here if needed
      if(onLogin){onLogin()}
      navigate("/dashboard");

      Cookies.set("jwtToken", token, { expires: 1 }); // expires in 1 day

      // Reset
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
