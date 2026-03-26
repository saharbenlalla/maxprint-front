import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://maxprint-back-1.onrender.com/api/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      console.log(decoded.role);
      Swal.fire({
            title: "Succès 🎉",
            text: "Connexion avec succés!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffcc00",
            background: "#ffffff"
          }).then(() => {
            navigate("/");
          })
        } catch (err) {
              Swal.fire({
              title: "Erreur ❌",
              text: "les coordonnées sont non valides.",
              icon: "error",
              confirmButtonColor: "#0b1c48"
            });
            }
      }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connexion</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <button className="btn-primary">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;