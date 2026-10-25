// Home.jsx - PAGE D'ACCUEIL
// ============================================================================
// Rôle : décor désert + jardin zen, magasin fondu dans le paysage,
//        bloc de présentation à droite (comme la slide de WhiskyV2).
//
// POINTS REACT :
// - Composant SANS état (pas de useState) : tout ce qui bouge est animé en CSS.
//   Règle pro : si une animation ne dépend d'aucune donnée, le CSS suffit,
//   on n'ajoute pas d'état React (moins de re-rendus, plus fluide).
// - Les décors sont générés avec Array.from() + .map() : un tableau de données
//   → une liste d'éléments JSX. Chaque élément a une `key` stable.
// - Les valeurs propres à chaque décor (position, durée...) passent au CSS par
//   des VARIABLES CSS dans `style` : style={{ "--x": "60%" }}.
//   Le CSS lit ensuite var(--x). React gère les données, le CSS l'animation.
// - Les tableaux sont calculés HORS du composant : ils ne sont créés qu'une
//   fois au chargement du module, pas à chaque rendu.
// ============================================================================

import { Link } from "react-router-dom";
import "@/assets/Styles/Home.css";
import magasin from "@/assets/images/Mon_Magasin.webp";
// Vite transforme ces imports d'images en URL (et vérifie qu'elles existent)
import fleurCerisier from "@/assets/images/decor/fleur-cerisier.svg";
import tumbleweed from "@/assets/images/decor/tumbleweed.svg";

/**
 * SAKURA : pétales et fleurs de cerisier qui tombent côté jardin zen (droite).
 * Valeurs dérivées de l'index i (pas de Math.random) : un rendu React doit
 * donner le même résultat à chaque fois (fonction "pure").
 * - x      : position horizontale de départ, en % (60% à 98% = côté jardin zen)
 * - delai  : NÉGATIF → l'animation est "déjà en cours" au chargement,
 *            la pluie de pétales est là dès la première image
 * - fleur  : 1 élément sur 3 est une fleur entière, les autres des pétales
 */
const SAKURA = Array.from({ length: 22 }, (_, i) => ({
  x: 60 + ((i * 23) % 38),
  delai: -(i * 1.1),
  duree: 13 + (i % 6) * 2,
  taille: i % 3 === 0 ? 16 + (i % 4) * 4 : 7 + (i % 4) * 3,
  fleur: i % 3 === 0,
}));

/**
 * TUMBLEWEEDS : boules de broussailles poussées par le vent côté désert.
 * Effet de perspective : plus un tumbleweed est "loin", plus il est petit,
 * haut dans l'image (vers l'horizon) et lent.
 */
const TUMBLEWEEDS = [
  { y: 80, taille: 96, duree: 17, delai: -2, rebond: 1.1 }, // proche
  { y: 72, taille: 58, duree: 23, delai: -13, rebond: 0.9 }, // milieu
  { y: 64, taille: 34, duree: 29, delai: -22, rebond: 0.8 }, // lointain
];

/** GRAINS : poussière de sable soulevée par le même vent. */
const GRAINS = Array.from({ length: 14 }, (_, i) => ({
  y: 55 + ((i * 17) % 38),
  delai: -(i * 2.1),
  duree: 14 + (i % 4) * 4,
  taille: 2 + (i % 3),
}));

const Home = () => {
  return (
    <section className="home-hero">
      {/* ===== 1-2. FOND + VOILES (du fond vers l'avant) ===== */}
      <div className="home-hero__fond" aria-hidden="true" />
      <div className="home-hero__calque" aria-hidden="true" />

      {/* ===== 3. AIR : sakura (droite) + sable (gauche) =====
          aria-hidden : purement décoratif, ignoré par les lecteurs d'écran */}
      <div className="home-hero__decor" aria-hidden="true">
        {SAKURA.map((s, i) => (
          // .sakura descend (chute) ; l'enfant tournoie sur lui-même.
          // Deux éléments = deux animations indépendantes qui se combinent.
          <span
            key={`sakura-${i}`}
            className="sakura"
            style={{
              "--x": `${s.x}%`,
              "--delai": `${s.delai}s`,
              "--duree": `${s.duree}s`,
              "--taille": `${s.taille}px`,
            }}
          >
            {s.fleur ? (
              <img src={fleurCerisier} alt="" className="sakura__fleur" />
            ) : (
              <span className="sakura__petale" />
            )}
          </span>
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

      {/* ===== 4. LE MAGASIN, fondu dans le paysage (masques CSS) ===== */}
      <figure className="home-hero__magasin">
        <img
          src={magasin}
          alt="Façade de la boutique CacSaï, entourée de cactus et de bonsaïs"
          className="home-hero__magasin-img"
        />
      </figure>

      {/* ===== 5. SOL : tumbleweeds qui roulent devant le magasin =====
          3 niveaux imbriqués = 3 mouvements combinés :
          .tumbleweed (traverse) > __rebond (saute) > __img (tourne)
          + __ombre posée au sol, qui rétrécit quand la boule saute */}
      <div className="home-hero__sol" aria-hidden="true">
        {TUMBLEWEEDS.map((t, i) => (
          <span
            key={`tumbleweed-${i}`}
            className="tumbleweed"
            style={{
              "--y": `${t.y}%`,
              "--taille": `${t.taille}px`,
              "--duree": `${t.duree}s`,
              "--delai": `${t.delai}s`,
              "--rebond": `${t.rebond}s`,
            }}
          >
            <span className="tumbleweed__ombre" />
            <span className="tumbleweed__rebond">
              <img src={tumbleweed} alt="" className="tumbleweed__img" />
            </span>
          </span>
        ))}
      </div>

      {/* ===== 6. Brume basse qui dérive (profondeur) ===== */}
      <div className="home-hero__brume" aria-hidden="true">
        <div className="brume brume--loin" />
        <div className="brume brume--proche" />
      </div>

      {/* ===== 7. PRÉSENTATION (droite) ===== */}
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
        {/* <Link> (et pas <a href>) : navigation sans recharger la page (SPA) */}
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
