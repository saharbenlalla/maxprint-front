import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h4>Agence Publicitaire</h4>
          <h1>
            Spécialisée en <span>Habillage Façade</span> <br />
            & Panneaux Publicitaires
          </h1>
          <p>
            Nous créons vos enseignes & panneaux publicitaires sur mesure
            pour mettre en valeur votre entreprise.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Demander un Devis</button>
            <button className="btn-secondary">Nos Réalisations</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;