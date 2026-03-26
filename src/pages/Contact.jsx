import "../styles/Contact.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import MapLeaflet from "../components/MapLeaflet";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://maxprint-back-1.onrender.com/api/contacts", form);

      Swal.fire({
        title: "Message envoyé 🎉",
        text: "Nous vous contacterons très bientôt.",
        icon: "success",
        confirmButtonColor: "#ffcc00"
      });

      setForm({ name:"", email:"", phone:"", message:"" });

    } catch (err) {
      Swal.fire({
        title: "Erreur ❌",
        text: "Impossible d'envoyer le message.",
        icon: "error",
        confirmButtonColor: "#0b1c48"
      });
    }
  };

  return (
    <section className="contact">

      <div className="contact-hero">
        <h1>Contactez <span>MaxPrint</span></h1>
        <p>Parlons de votre projet publicitaire</p>
      </div>

      <div className="contact-container">

        {/* INFO */}
        <div className="contact-info">
          <h2>Nos coordonnées</h2>
          <p> <FaMapMarkerAlt color="#ffcc00" size={16} /> Sidi Hassine en face l'agence technique de transport terrestres</p>
          <p> <FaPhoneAlt color="#0b1c48" size={16} /> +216 27 110 822 - +216 58 044 174</p>
          <p> <FaWhatsapp style={{ color: "#25D366", marginRight: "5px" }} /> +216 27 110 822</p>
          <div className="contact-hours">
            <h3> <FaClock color="#ffcc00" size={18} /> Horaires</h3>
            <p>Lundi - Vendredi : 8h00 - 17h00</p>
            <p>Samedi : 8h00 - 13h00</p>
          </div>
        </div>

        {/* FORM */}
        <div className="contact-form">
          <h2>Envoyez-nous un message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Votre message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button className="btn-primary">
              Envoyer le message
            </button>
          </form>
        </div>
        
      </div>
      {/* GOOGLE MAP */}
      <div className="contact-map">
      <h2>Nous trouver</h2>
        <MapLeaflet />
      </div>
    </section>
  );
}

export default Contact;