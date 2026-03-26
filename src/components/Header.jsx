import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import logo from "../Assets/logoo-removebg-preview.png"
const Header = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo"/>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/services">Nos Services</a></li>
            <li><a href="/products">Nos Produits</a></li>
            <li><a href="/offres">Nos offres</a></li>
            <li><a href="/about">A propos</a></li>
            <li><a href="/contact">Contact</a></li>
            {!token && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}

            {/* Espace Admin visible si role=admin */}
            {token && role === "admin" && (
              <li><Link to="/admin">Espace Admin</Link></li>
            )}

            {token && (
              <li onClick={handleLogout} className="logout-icon">
                <FontAwesomeIcon icon={faRightFromBracket} title="Logout" />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;