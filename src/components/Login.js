import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {BaseUrl} from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BaseUrl+'/api/login/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // Save token
        navigate("/dashboard"); // Redirect after login
      } else {
        setMessage(data.error || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <div className="input-group">
          <label htmlFor="email">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
        {message && <p className="message">{message}</p>}

                <div className="signup-link">
          <p>Don't have an account? <a href="http://localhost:3000/register">Sign up here</a></p>
        </div>

      </form>
    </div>
  );
};

export default Login;
