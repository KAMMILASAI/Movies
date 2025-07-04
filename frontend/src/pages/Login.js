import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email); 
      if (user && user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate(user.role === "ADMIN" ? "/admin" : "/movies");
        }, 2000); 
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("User not found");
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" className="auth-input" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-switch">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
