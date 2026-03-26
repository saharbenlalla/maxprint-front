import { useEffect, useState } from "react";
import axios from "axios";
import "./offerPage.css"; 

function Offers() {
  const [offers, setOffers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // pour lightbox

  useEffect(() => {
    axios
      .get("https://maxprint-back-1.onrender.com/api/offers")
      .then((res) => setOffers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="offers">
      <div className="offers-overlay">
        {/* Header */}
        <div className="offers-header">
          <h1>
            Nos <span>Offres</span>
          </h1>
          <p>Choisissez la solution parfaite pour votre projet</p>
        </div>

        {/* Cartes des offres */}
        <div className="offers-cards">
          {offers.map((offer) => (
            <div
              className={`offer-card ${offer.popular ? "popular" : ""}`}
              key={offer._id}
            >
              {/* Image de l'offre */}
              {offer.image && (
                <div className="offer-image">
                  <img
                    src={`https://maxprint-back-1.onrender.com${offer.image}`}
                    alt={offer.title}
                    onClick={() =>
                      setSelectedImage(`https://maxprint-back-1.onrender.com${offer.image}`)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}

              {/* Titre */}
              <h3>{offer.title}</h3>

              {/* Description */}
              <p className="desc">{offer.description}</p>

              {/* Prix */}
              <h2 className="offer-price">{offer.price} DT</h2>

              {/* Bouton WhatsApp */}
              <a
                href={`https://wa.me/21627110822?text=Je veux l'offre ${offer.title}`}
                className="btn-primary"
              >
                Contacter nous
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox pour agrandir l'image */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Offre" />
        </div>
      )}
    </section>
  );
}

export default Offers;