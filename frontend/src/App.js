// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Movies from "./pages/Movies";
// import MovieDetails from "./pages/MovieDetails";
// import Downloads from "./pages/Downloads";
// import Admin from "./pages/Admin";
// import ProtectedRoute from "./ProtectedRoute";
// import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Filter from "./pages/Filter";

// function Layout({ children }) {
//   const location = useLocation();
//   const isAuthPage = location.pathname === "/" || location.pathname === "/register";

//   return (
//     <>
//       {!isAuthPage && <Navbar />} {/* Navbar only if not on login/register */}
//       {children}
//       {!isAuthPage && <Footer />} {/* Footer only if not on login/register */}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route
//             path="/movies"
//             element={
//               <ProtectedRoute>
//                 <Movies />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/movies/:id"
//             element={
//               <ProtectedRoute>
//                 <MovieDetails />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/filter"
//             element={
//               <ProtectedRoute>
//                 <Filter />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/downloads"
//             element={
//               <ProtectedRoute>
//                 <Downloads />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <Admin />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Downloads from "./pages/Downloads";
import Admin from "./pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Filter from "./pages/Filter";

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Accessible to all authenticated users) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/downloads" element={<Downloads />} />
          </Route>

          {/* Admin-Only Route */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
