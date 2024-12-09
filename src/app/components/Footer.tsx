import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <h1 className="footer-logo">Bandage</h1>
        <div className="social-icons">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company Info</h3>
          <ul>
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Features</h3>
          <ul>
            <li>Business Marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </ul>
        </div>
        <div className="footer-section get-in-touch">
          <h3>Get In Touch</h3>
          <div className="subscribe">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
          <p>Lorem ipsum sum dolor Amit</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Made With Love By Finland All Right Reserved</p>
      </div>
    </footer>
  );
}
