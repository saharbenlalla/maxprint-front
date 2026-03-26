import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://maxprint-back-1.onrender.com/api/auth/register", form);
      Swal.fire({
      title: "Succès 🎉",
      text: "Votre compte a été créé avec succès !",
      icon: "success",
      confirmButtonText: "Se connecter",
      confirmButtonColor: "#ffcc00",
      background: "#ffffff"
    }).then(() => {
      navigate("/login");
    });
    } catch (err) {
      Swal.fire({
      title: "Erreur ❌",
      text: "Email déjà utilisé ou problème serveur.",
      icon: "error",
      confirmButtonColor: "#0b1c48"
    });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Créer un compte</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Adresse"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
          />

          <button className="btn-primary">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;