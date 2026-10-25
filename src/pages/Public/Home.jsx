// Home.jsx - PAGE D'ACCUEIL
// ============================================================================
// Rôle : Section héro avec background thèmes unis + image magasin en overlay
// Composant simple (pas d'état) = Fonction pure
// ============================================================================

import "@/assets/Styles/Home.css";
import magasin from "@/assets/images/Mon_Magasin.webp";

/**
 * Home - Page d'accueil
 *
 * Structure :
 * - .home-hero : div conteneur avec background image
 * - .home-hero-overlay : image du magasin par-dessus
 *
 * CSS gère :
 * - Background: image accueil thèmes unis (16:9)
 * - Position absolute de l'image magasin
 * - Responsive (mobile, tablet, desktop)
 */
const Home = () => {
  return (
    <section className="home-hero">
      {/* Titre à droite, comme "BONSAI Mania" sur la maquette */}
      <div className="home-hero-text" aria-hidden="true">
        <h2 className="home-hero-title">CacSaï</h2>
        <p className="home-hero-tagline">Cactus &amp; Bonsaï</p>
      </div>

      {/*
        Image du magasin en overlay
        Position absolute, centrée, avec shadow pour la profondeur
      */}
      <div className="home-hero-overlay">
        <img
          src={magasin}
          alt="Façade boutique CacSaï - Jardinerie Cactus & Bonsaï"
          className="home-magasin-image"
        />
      </div>

      {/* 
        Contenu texte optionnel (non utilise pour l'instant)
        Prévu pour futur : slogan, CTA, promo
        Laissé en commentaire pour anticipation backend
      */}
      {/* 
      <div className="home-hero-content">
        <h2>Bienvenue dans notre univers</h2>
        <p>Cactus & Bonsaï unissent deux mondes</p>
      </div>
      */}
    </section>
  );
};

export default Home;
