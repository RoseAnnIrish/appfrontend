import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Registration.css';
import { BaseUrl } from "../constants";

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function setMessage(registrationSuccessful) {
    if (registrationSuccessful) {
      alert(registrationSuccessful);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BaseUrl + '/api/register/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
      console.error("Registration Error:", error);
    }
  };

  // Function to handle closing and navigating to the login page
  const handleClose = () => {
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-form-container">
        {/* Close button (X) */}
        <button onClick={handleClose} className="close-btn">X</button>

        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Create an Account</h2>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
