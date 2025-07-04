// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("user"); // Check if user exists in localStorage

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminOnly }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from local storage

  if (!user) {
    return <Navigate to="/" replace />; // Redirect unauthenticated users to login
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/movies" replace />; // Redirect non-admin users
  }

  return <Outlet />; // Allow access
};

export default ProtectedRoute;
