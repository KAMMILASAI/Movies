import React, { useState } from "react";
import { registerUser } from "./api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ ...formData, role: "USER" });
      if (response.id) {
        toast.success("🎉 Registration Successful!", { position: "top-right", autoClose: 1000 });
        setTimeout(() => (window.location.href = "/"), 1000);
      } else {
        toast.error("⚠️ Registration failed. Try again!", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("❌ Email already exists or something went wrong!", { position: "top-right", autoClose: 3000 });
    }
  };

  // OAuth Login Handlers
  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    // toast.error("working on implementing")
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Create an Account</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="auth-input"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="auth-btn">Register</button>
          </form>

          <p className="auth-switch">
            Already have an account? <a href="/">Login</a>
          </p>

          <div className="social-login"><br></br>
            <p>------ Or Sign Up With ------</p><br></br>
            <div className="social-buttons">
              <button className="google-btn" onClick={() => handleOAuthLogin("google")}>
                <FaGoogle />
              </button>
              <button className="github-btn" onClick={() => handleOAuthLogin("github")}>
                <FaGithub />
              </button>
              <button className="facebook-btn" onClick={() => handleOAuthLogin("facebook")}>
                <FaFacebook />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
};

export default Register;



// import React, { useState } from "react";
// import { registerUser } from "./api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser({ name, email, password, role: "USER" });
//       if (response.id) {
//         toast.success("Registration Successful!", { position: "top-right", autoClose: 1000 });
//         setTimeout(() => (window.location.href = "/"), 1000);
//       } else {
//         toast.error(response || "Registration failed. Try again!", { position: "top-right", autoClose: 3000 });
//       }
//     } catch (error) {
//       toast.error("Something went wrong! Please try again. or Email already exists", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   // Dummy handlers for OAuth login
//   const handleGoogleLogin = () => toast.info("Google Login Clicked!");
//   const handleGitHubLogin = () => toast.info("GitHub Login Clicked!");
//   const handleFacebookLogin = () => toast.info("Facebook Login Clicked!");

//   return (
//     <>
//       <div className="auth-container">
//         <div className="auth-box">
//           <h2 className="auth-title">Register</h2>
//           <form onSubmit={handleRegister}>
//             <input
//               type="text"
//               placeholder="Name"
//               className="auth-input"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="auth-input"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="auth-input"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit" className="auth-btn">Register</button>
//           </form>

//           <p className="auth-switch">Already have an account? <a href="/">Login</a></p>
//             <br></br>
//           <div className="social-login">
//             <p>------Or Sign Up With------</p><br></br>
//             <div className="social-buttons">
//                  <button className="google-btn" onClick={handleGoogleLogin}>
//                   <span className="social-icon"><FaGoogle /></span>
//                 </button>
//                <button className="github-btn" onClick={handleGitHubLogin}>
//                <span className="social-icon"><FaGithub /></span>
//                </button>
//                  <button className="facebook-btn" onClick={handleFacebookLogin}>
//                <span className="social-icon"><FaFacebook /></span>
//               </button>
//               </div>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container for Notifications */}
//       <ToastContainer />
//     </>
//   );
// };

// export default Register;
