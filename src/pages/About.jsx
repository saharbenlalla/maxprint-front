import "../styles/About.css";
import aboutImage from "../Assets/hero1.png";
import projet1 from "../Assets/projet1.jpg";
import projet2 from "../Assets/projet2.jpg";
import projet3 from "../Assets/projet3.jpg";
import projet4 from "../Assets/projet4.jpg";
import projet5 from "../Assets/projet5.jpg";
import projet6 from "../Assets/projet6.jpg";
import projet7 from "../Assets/projet7.jpg";
import projet8 from "../Assets/projet8.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <h1>
          À propos de <span>MaxPrint</span>
        </h1>
        <p>
          Votre partenaire en solutions publicitaires et communication visuelle.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Notre Mission</h2>
          <p>
            Chez MaxPrint, nous accompagnons les entreprises dans la création
            et la personnalisation de leurs supports publicitaires.
            De la conception graphique à la réalisation finale,
            nous transformons vos idées en supports visuels impactants.
          </p>

          <h2>Nos Services</h2>
          <ul>
            <li>✔ Façade & décoration intérieure / extérieure</li>
            <li>✔ Impression numérique & offset</li>
            <li>✔ Lettres 3D & enseignes lumineuses</li>
            <li>✔ Habillage voitures & vitrines</li>
            <li>✔ Flyers, cartes de visite, menus, catalogues</li>
            <li>✔ Laser & gravure numérique</li>
          </ul>
        </div>

        <div className="about-image">
          <img src={aboutImage} alt="Agence publicitaire" />
        </div>
      </div>
      {/* POURQUOI NOUS CHOISIR */}
<div className="why-us">
  <h2>Pourquoi nous choisir ?</h2>

  <div className="why-grid">
    <div className="why-card">
      <h3>🎯 Expertise & Expérience</h3>
      <p>
        Une équipe spécialisée en communication visuelle et solutions
        publicitaires personnalisées.
      </p>
    </div>

    <div className="why-card">
      <h3>⚡ Rapidité & Qualité</h3>
      <p>
        Production rapide avec des matériaux de haute qualité
        pour un rendu professionnel durable.
      </p>
    </div>

    <div className="why-card">
      <h3>💡 Créativité</h3>
      <p>
        Des concepts modernes et impactants adaptés à votre image de marque.
      </p>
    </div>

    <div className="why-card">
      <h3>🤝 Accompagnement personnalisé</h3>
      <p>
        Nous vous conseillons à chaque étape pour garantir un résultat
        qui dépasse vos attentes.
      </p>
    </div>
  </div>
</div>


{/* GALERIE REALISATIONS */}
<div className="gallery">
  <h2>Nos Réalisations</h2>
    <div className="gallery-grid">
      <img src={projet1} alt="Projet 1" />
      <img src={projet2} alt="Projet 2" />
      <img src={projet3} alt="Projet 3" />
      <img src={projet4} alt="Projet 4" />
      <img src={projet5} alt="Projet 5" />
      <img src={projet6} alt="Projet 6" />
      <img src={projet7} alt="Projet 6" />
      <img src={projet8} alt="Projet 6" />
    </div>
      </div>
      <div className="about-cta">
        <h2>Donnez vie à votre image de marque</h2>
        <Link to="/contact" className="btn-primary">
          Nous contacter
        </Link>
      </div>
    </section>
  );
}

export default About;