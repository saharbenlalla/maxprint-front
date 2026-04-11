import "../styles/Header.css";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok 
} from "react-icons/fa";
import logo from "../Assets/logoo-removebg-preview.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="logo"/>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/services">Nos Services</a></li>
            <li><a href="/products">Nos produits</a></li>
            <li><a href="/about">A propos</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social p-40">
          <a href="https://www.facebook.com/Maxprint.tunis"><FaFacebookF /></a>
          <a href="https://www.instagram.com/maxprint_agence_publicitaire?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a>
          <a href="https://www.tiktok.com/@maxprint2016?_r=1&_t=ZS-94KrRkWSr2Y"><FaTiktok /></a>
        </div>
        <p className="footer-copy">© 2026 maXprint. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;