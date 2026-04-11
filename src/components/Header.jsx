import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import logo from "../Assets/logoo-removebg-preview.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.log("Token invalide");
    }
  }

  const navigate = useNavigate();
  const closeMenu = () => {
  setMenuOpen(false);
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* bouton mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li><Link to="/services" onClick={closeMenu}>Nos Services</Link></li>
            <li><Link to="/products" onClick={closeMenu}>Nos Produits</Link></li>
            <li><Link to="/offres" onClick={closeMenu}>Nos offres</Link></li>
            <li><Link to="/about" onClick={closeMenu}>A propos</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

            {!token && (
              <>
                <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
              </>
            )}

            {token && role === "admin" && (
              <li><Link to="/admin" onClick={closeMenu}>Espace Admin</Link></li>
            )}

            {token && (
              <li onClick={handleLogout} className="logout-icon">
                <FontAwesomeIcon icon={faRightFromBracket} />
              </li>
            )}
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;