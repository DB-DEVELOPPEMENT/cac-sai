// Home.jsx - PAGE D'ACCUEIL
// ============================================================================
// Rôle : décor désert + jardin zen, magasin fondu dans le paysage,
//        bloc de présentation à droite (comme la slide de WhiskyV2)
// Composant sans état : les décors animés sont calculés une seule fois,
// hors du composant, donc le rendu reste une fonction pure.
// ============================================================================

import { Link } from "react-router-dom";
import "@/assets/Styles/Home.css";
import magasin from "@/assets/images/Mon_Magasin.webp";

/**
 * Décors animés générés à partir de l'index (pas de Math.random :
 * un rendu React doit donner le même résultat à chaque fois).
 * Chaque valeur part en variable CSS (--x, --delai...) lue par Home.css.
 */
const PETALES = Array.from({ length: 16 }, (_, i) => ({
  x: 52 + ((i * 29) % 46), // côté jardin zen (droite), en %
  delai: -(i * 1.3), // délai négatif : l'animation a déjà commencé au chargement
  duree: 12 + (i % 5) * 2.5,
  taille: 7 + (i % 4) * 3,
}));

const GRAINS = Array.from({ length: 14 }, (_, i) => ({
  y: 55 + ((i * 17) % 38), // bas du désert (gauche), en %
  delai: -(i * 2.1),
  duree: 14 + (i % 4) * 4,
  taille: 2 + (i % 3),
}));

const Home = () => {
  return (
    <section className="home-hero">
      {/* ===== CALQUES DU DÉCOR (du fond vers l'avant) ===== */}
      <div className="home-hero__fond" aria-hidden="true" />
      <div className="home-hero__calque" aria-hidden="true" />

      <div className="home-hero__decor" aria-hidden="true">
        {PETALES.map((p, i) => (
          <span
            key={`petale-${i}`}
            className="petale"
            style={{
              "--x": `${p.x}%`,
              "--delai": `${p.delai}s`,
              "--duree": `${p.duree}s`,
              "--taille": `${p.taille}px`,
            }}
          />
        ))}
        {GRAINS.map((g, i) => (
          <span
            key={`grain-${i}`}
            className="grain"
            style={{
              "--y": `${g.y}%`,
              "--delai": `${g.delai}s`,
              "--duree": `${g.duree}s`,
              "--taille": `${g.taille}px`,
            }}
          />
        ))}
      </div>

      {/* ===== LE MAGASIN, fondu dans le paysage (masques CSS) ===== */}
      <figure className="home-hero__magasin">
        <img
          src={magasin}
          alt="Façade de la boutique CacSaï, entourée de cactus et de bonsaïs"
          className="home-hero__magasin-img"
        />
      </figure>

      {/* ===== Brume basse qui dérive (profondeur) ===== */}
      <div className="home-hero__brume" aria-hidden="true">
        <div className="brume brume--loin" />
        <div className="brume brume--proche" />
      </div>

      {/* ===== PRÉSENTATION (droite) ===== */}
      <div className="home-hero__texte">
        <p className="surtitre">Jardinerie · Désert &amp; jardin zen</p>
        <h2 className="home-hero__titre">CacSaï</h2>
        <p className="home-hero__tagline">Cactus &amp; Bonsaï</p>
        <div className="filet" aria-hidden="true" />
        <p className="home-hero__intro">
          Deux mondes, une même patience : la force tranquille des cactus du
          désert et l'art millénaire des bonsaïs, réunis dans une seule
          boutique.
        </p>
        <nav className="home-hero__liens" aria-label="Nos collections">
          <Link to="/cactus" className="lien-or">
            Les cactus →
          </Link>
          <Link to="/bonsai" className="lien-or">
            Les bonsaïs →
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default Home;
