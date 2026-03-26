import React from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  return (
    <div className="admin-home">

      <h1>Tableau de bord Admin</h1>
      <p>Bienvenue dans l’espace d’administration. Choisissez une gestion :</p>

      <div className="admin-links">

        <Link to="/admin/categories" className="admin-link">
          Gestion des Categories
        </Link>

        <Link to="/admin/products" className="admin-link">
          Gestion des Produits
        </Link>

        <Link to="/admin/services" className="admin-link">
          Gestion des Services
        </Link>

        <Link to="/admin/users" className="admin-link">
          Gestion des Utilisateurs
        </Link>

          <Link to="/admin/offers" className="admin-link">
          Gestion des offres
        </Link>

      </div>
      
    </div>
  );
}

export default AdminPage;