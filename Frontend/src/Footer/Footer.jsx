import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">About Sam WatchWave</h3>
          <p className="footer-text">
            At Sam WatchWave, we bring you the latest and most stylish watches from top brands. Whether it's luxury, sport, or classic—find your perfect timepiece here.
          </p>
          <Link to="/about" className="footer-link">Learn More</Link>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">📍 123 Timepiece Avenue, Madanapalle, India</p>
          <p className="footer-text">📞 +91 98765 43210</p>
          <p className="footer-text">✉️ support@samtimelines.com</p>
          <Link to="/contact" className="footer-link">Contact Page</Link>
        </div>

        {/* Social Media Links with <Link> for external URLs */}
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-socials">
            <Link to={{ pathname: "https://instagram.com" }} target="_blank" className="footer-link">Instagram</Link>
            <Link to={{ pathname: "https://facebook.com" }} target="_blank" className="footer-link">Facebook</Link>
            <Link to={{ pathname: "https://twitter.com" }} target="_blank" className="footer-link">Twitter</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sam WatchWave. All rights reserved.</p>
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
