import { useState } from "react";
import { Link } from "react-router-dom";
import "@/assets/Styles/Header.css"; // Styles du header

export default function Header() {
  /**
   * État pour le menu burger
   * isOpen = true/false pour afficher/cacher le menu mobile
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //  TOGGLES & EVENT HANDLERS

  /**
   * Basculer l'affichage du menu burger
   * Click sur l'icône burger → menu s'ouvre/ferme
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Fermer le menu après un click
   * Utile : click sur "Accueil" → menu se ferme automatiquement
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //  JSX RETURN

  return (
    <header className="header">
      {/* ========== PARTIE GAUCHE : Logo + Titre ========== */}
      <div className="header__left">
        {/* Logo - lien vers accueil */}
        <Link to="/" className="header__logo">
          <img
            src="/logo-cac-sai.webp"
            alt="Logo CacSaï"
            className="header__logo-img"
          />
        </Link>

        {/* Titre de bienvenue */}
        <div className="header__title">
          <h1>Bienvenue dans CacSaï</h1>
          <p>Jardinerie Cactus & Bonsaï</p>
        </div>
      </div>

      {/* ========== PARTIE DROITE : Réseaux + Burger ========== */}
      <div className="header__right">
        {/* Réseaux sociaux (visible sur desktop, caché sur mobile) */}
        <nav className="header__social">
          <span className="social-link">Instagram</span>
          <span className="social-link">Facebook</span>
          <span className="social-link">TikTok</span>
        </nav>

        {/* Bouton Menu Burger (visible que sur mobile/tablette) */}
        <button
          className={`header__burger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu navigation"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* ========== MENU MOBILE (caché par défaut) ========== */}
      {isMenuOpen && (
        <nav className="header__mobile-menu">
          <Link to="/" onClick={closeMenu}>
            Accueil
          </Link>
          <Link to="/cactus" onClick={closeMenu}>
            Cactus
          </Link>
          <Link to="/bonsai" onClick={closeMenu}>
            Bonsaï
          </Link>
          {/* 
             TODO BACKEND
            Quand on créera le système de panier/commandes :
            <Link to="/panier" onClick={closeMenu}>
              Panier
            </Link>
            <Link to="/profil" onClick={closeMenu}>
              Mon profil
            </Link>
          */}
        </nav>
      )}
    </header>
  );
}
