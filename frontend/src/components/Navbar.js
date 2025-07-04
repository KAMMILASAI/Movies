import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaDownload, FaSun, FaMoon, FaFilter, FaUser } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Get user object

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user info
    setUser(null); // Update state
    navigate("/"); // Redirect to login
  };

  if (!user) return null; // Hide Navbar if user is not logged in

  return (
    <nav className="navbar">
      <h2 className="logo">
      <Link to="/movies">Movies</Link>
      </h2>

      <ul className="nav-links">
        <li>
          <Link to={user.role === "ADMIN" ? "/admin" : "/filter"}>
            <FaFilter className="filter-icon" title="Filter Movies" /> {user.role === "ADMIN" ? "Update" : "Filter"}
          </Link>
        </li>
        <li>
        {user.role !== "ADMIN" && (  // Show "Downloads" only for normal users
        <Link to="/downloads">
              <FaDownload className="download-icon" title="Downloads" /> Downloads
        </Link>
        )}
        </li>

        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* User Icon & Popup */}
        <li className="user-menu">
          <FaUser
            className="auth-icon"
            title="User Menu"
            onClick={() => setShowAuthOptions(!showAuthOptions)}
          />

          {showAuthOptions && (
            <div className="auth-dropdown">
              <h4>Email: {user.email}</h4>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

