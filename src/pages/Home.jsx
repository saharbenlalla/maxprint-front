import "../styles/Home.css";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
    </div>
  );
};

export default Home;