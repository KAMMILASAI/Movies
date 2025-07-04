import React from "react";
import { FaGithub, FaFacebook, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="contact-us">
          <h2>Contact Us</h2>
          <p><FaMapMarkerAlt /> <strong>Location:</strong> Pippara, West Godavari, AP</p>
          <p><FaEnvelope /> <strong>Email:</strong> <a href="mailto:saikammila143@gmail.com">saikammila143@gmail.com</a></p>
        </div>

        <div className="footer-social">
          <h2>Follow Us</h2>
          <a href="https://github.com/KAMMILASAI"><FaGithub /> GitHub</a>
          <a href="https://www.facebook.com/saikammila.kammila.9"><FaFacebook /> Facebook</a>
          <a href="https://www.linkedin.com/in/sai-kammila-64310229b/"><FaLinkedin /> LinkedIn</a>
        </div>

        {/* <div className="footer-services">
          <h2>Our Services</h2>
          <ul>
            <li>Movies</li>
          </ul>
        </div> */}
      </div>

      <h3>&copy; {new Date().getFullYear()} Sai Kammila. All rights reserved.</h3>
    </footer>
  );
};

export default Footer;
