import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function TrialCTA() {
  return (
    <div className="cta-container">
      <h1 className="cta-title">Start your 14 days free trial</h1>
      <p className="cta-subtitle">
        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
      </p>
      <button className="cta-button">Try it free now</button>
      <div className="social-icons">
        <a href="#" className="social-icon" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="#" className="social-icon" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" className="social-icon" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
