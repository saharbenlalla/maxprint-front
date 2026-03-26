import service1 from "../Assets/alucobond.png";
import service2 from "../Assets/service2.jpg";
import service3 from "../Assets/service3.jpg";
import service4 from "../Assets/service4.jpg";
import "../styles/Services.css"
const Services = () => {
  return (
    <section className="services">
      <h2>
        Nos Services de Publicité <span>& Signalétique</span>
      </h2>
      <p>Découvrez nos services sur mesure pour booster votre image.</p>

      <div className="services-grid">
        <div className="service-card">
          <img src={service1} alt="Habillage Façades Alucobond" />
          <h3>Habillage Façades Alucobond</h3>
          <p>Habillage moderne et professionnel pour votre façade.</p>
          <button className="btn-primary">Voir Plus</button>
        </div>

        <div className="service-card">
          <img src={service2} alt="Panneaux Publicitaires" />
          <h3>Panneaux Publicitaires</h3>
          <p>Panneaux extérieurs et enseignes lumineuses.</p>
          <button className="btn-primary">Voir Plus</button>
        </div>

        <div className="service-card">
          <img src={service3}  alt="Décoration Intérieure & Extérieure" />
          <h3>Décoration Intérieure & Extérieure</h3>
          <p>Personnalisation complète de vos espaces.</p>
          <button className="btn-primary">Voir Plus</button>
        </div>

        <div className="service-card">
          <img src={service4} alt="Conception 3D & Impression Numérique" />
          <h3>Conception 3D & Impression Numérique</h3>
          <p>Maquettes 3D et impressions haute qualité.</p>
          <button className="btn-primary">Voir Plus</button>
        </div>
      </div>
    </section>
  );
};

export default Services;