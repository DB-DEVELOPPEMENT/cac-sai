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
import magasin from "@/assets/Images/Mon_Magasin.webp";
// Vite transforme ces imports d'images en URL (et vérifie qu'elles existent)
import fleurCerisier from "@/assets/Images/decor/fleur-cerisier.svg";
import tumbleweed from "@/assets/Images/decor/tumbleweed.svg";

/**
 * SAKURA : pétales et fleurs de cerisier qui tombent côté jardin zen (droite).
 * Valeurs dérivées de l'index i (pas de Math.random) : un rendu React doit
 * donner le même résultat à chaque fois (fonction "pure").
 * - x      : position horizontale de départ, en % (60% à 98% = côté jardin zen)
 * - delai  : NÉGATIF → l'animation est "déjà en cours" au chargement,
 *            la pluie de pétales est là dès la première image
 * - fleur  : 1 élément sur 3 est une fleur entière, les autres des pétales
 * - plan   : PROFONDEUR DE CHAMP (comme une caméra de cinéma) :
 *            0 = loin (petit, un peu flou, pâle, lent)
 *            1 = net (zone de mise au point)
 *            2 = premier plan (grand, très flou = "bokeh", plus rapide)
 *            Le plan part dans l'attribut data-plan, que le CSS lit.
 */
const SAKURA = Array.from({ length: 24 }, (_, i) => {
  const plan = i % 3;
  const fleur = i % 4 === 0;
  const echelle = [0.6, 1, 1.8][plan]; // taille selon le plan
  return {
    x: 60 + ((i * 23) % 38),
    delai: -(i * 1.6),
    duree: [26, 20, 15][plan] + (i % 5) * 2, // loin = plus lent (parallaxe)
    taille: Math.round((fleur ? 18 : 9) * echelle),
    fleur,
    plan,
  };
});

/**
 * TUMBLEWEEDS : boules de broussailles poussées par le vent côté désert.
 * Effet de perspective : plus un tumbleweed est "loin", plus il est petit,
 * haut dans l'image (vers l'horizon), lent et fondu dans la brume.
 */
const TUMBLEWEEDS = [
  { y: 80, taille: 96, duree: 24, delai: -3, rebond: 1.4 }, // proche
  { y: 72, taille: 58, duree: 31, delai: -17, rebond: 1.15 }, // milieu
  { y: 64, taille: 34, duree: 39, delai: -29, rebond: 1 }, // lointain
];

/**
 * BOURRASQUES : le sable ne vole pas en continu, il part par RAFALES.
 * 3 rafales réparties sur un cycle de 15 s. Chaque grain appartient à une
 * rafale (rafale = i % 3) et part presque en même temps que ses voisins
 * (petit décalage de 0,15 s) : on voit un "coup de vent" passer.
 */
const CYCLE_VENT = 15;
const RAFALES = [0, 1, 2].map((r) => -(r * CYCLE_VENT) / 3);

const GRAINS = Array.from({ length: 24 }, (_, i) => ({
  y: 56 + ((i * 17) % 34),
  delai: RAFALES[i % 3] - Math.floor(i / 3) * 0.15,
  taille: 1 + (i % 3),
}));

/** Traînées de sable : 2 fines lignes floues par rafale, juste avant les grains. */
const TRAINEES = Array.from({ length: 6 }, (_, i) => ({
  y: 60 + ((i * 11) % 26),
  delai: RAFALES[i % 3] + 0.3 - Math.floor(i / 3) * 0.4,
  largeur: 18 + (i % 3) * 8,
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
            data-plan={s.plan}
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

        {TRAINEES.map((t, i) => (
          <span
            key={`trainee-${i}`}
            className="trainee"
            style={{
              "--y": `${t.y}%`,
              "--delai": `${t.delai}s`,
              "--duree": `${CYCLE_VENT}s`,
              "--largeur": `${t.largeur}vw`,
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
              "--duree": `${CYCLE_VENT}s`,
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
          + __ombre posée au sol, qui rétrécit quand la boule saute
          + __poussiere qui jaillit quand la boule retombe */}
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
            {/* Petit nuage de sable soulevé à chaque atterrissage */}
            <span className="tumbleweed__poussiere" />
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
