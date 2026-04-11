import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [mainImages, setMainImages] = useState({}); // image principale par service
  const [selectedImage, setSelectedImage] = useState(null); // pour lightbox

  // Charger les services depuis le backend
  const loadServices = async () => {
    try {
      const res = await axios.get("https://maxprint-back-1.onrender.com/api/service");
      setServices(res.data);

      // Initialiser image principale pour chaque service
      const initialImages = {};
      res.data.forEach((s) => {
        initialImages[s._id] = s.images?.[0] || "";
      });
      setMainImages(initialImages);
    } catch (error) {
      console.error("Erreur en chargeant les services:", error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="services-page-container">
      <h1>Nos Services</h1>

      <div className="services-grid">
        {services.map((s) => (
          <div key={s._id} className="service-card">
            {/* Image principale */}
            <div className="service-image">
              <img
                src={`https://maxprint-back-1.onrender.com/uploads/${mainImages[s._id]}`}
                alt={s.name}
                onClick={() => setSelectedImage(mainImages[s._id])} // ouvre lightbox
              />
            </div>

            {/* Mini-carousel pour toutes les images */}
            <div className="mini-carousel">
              {s.images?.map((img, index) => (
                <img
                  key={index}
                  src={`https://maxprint-back-1.onrender.com/uploads/${img}`}
                  alt={s.name}
                  onClick={() =>
                    setMainImages({ ...mainImages, [s._id]: img })
                  }
                  className={mainImages[s._id] === img ? "active-thumb" : ""}
                />
              ))}
            </div>

            <h3>{s.name}</h3>
            <p className="desc">{s.description}</p>

            {/* Bouton Contacter via WhatsApp */}
            <a
              className="btn-contact"
              href={`https://wa.me/21627110822?text=Bonjour,%20je%20souhaite%20en savoir plus sur le service:%20${encodeURIComponent(
                s.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacter
            </a>
          </div>
        ))}
      </div>

      {/* Lightbox pour zoom */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={`https://maxprint-back-1.onrender.com/uploads/${selectedImage}`} alt="Service" />
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
