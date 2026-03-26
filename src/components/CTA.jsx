import React from "react";

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-left">
        <h2>Besoin d’une enseigne sur mesure ?</h2>
        <p>Nous sommes là pour vous !</p>
        <button className="btn-primary">Demander un Devis Gratuit</button>
      </div>

      <div className="cta-right">
        <h3>Obtenez un devis</h3>
        <p>+216 123 456 78</p>
        <p>contact@votresite.com</p>
      </div>
    </section>
  );
};

export default CTA;