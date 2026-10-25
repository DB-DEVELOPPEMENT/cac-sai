import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/assets/Styles/ProductCard.css";

const ProductCard = ({ product, onCardClick }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(product);
    }
    navigate(`/product/${product.id}`);
  };

  /**
   * handleMouseEnter - Survol souris : active le state hover
   * Déclenche les animations CSS (fade in du bouton, zoom image, etc.)
   */
  const handleMouseEnter = () => setIsHovered(true);

  /**
   * handleMouseLeave - Fin du survol : désactive le state hover
   * Les animations CSS reviennent à l'état initial
   */
  const handleMouseLeave = () => setIsHovered(false);

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────

  return (
    <article
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      {/* ───────────────────────────────────────────────────────────────
          IMAGE DU PRODUIT (conteneur)
          ─────────────────────────────────────────────────────────────── */}

      <div className="product-card__image-container">
        <img
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          className="product-card__image"
          loading="lazy"
        />

        {/* Overlay au survol pour texture/gradient */}
        <div className="product-card__image-overlay"></div>
      </div>

      {/* ───────────────────────────────────────────────────────────────
          INFOS DU PRODUIT
          ─────────────────────────────────────────────────────────────── */}

      <div className="product-card__content">
        {/* Badge catégorie */}
        <span className="product-card__category">
          {product.category === "cactus" ? "🌵" : "🌳"} {product.category}
        </span>

        {/* Nom du produit */}
        <h3 className="product-card__name">{product.name}</h3>

        {/* Description courte (limité à 2 lignes, tronquée) */}
        <p className="product-card__description">{product.description}</p>

        {/* Niveau de soin : petit badge */}
        <div className="product-card__care-level">
          <span className="product-card__care-icon">
            {product.careLevel === "Facile" && "⭐"}
            {product.careLevel === "Modéré" && "⭐⭐"}
            {product.careLevel === "Difficile" && "⭐⭐⭐"}
          </span>
          <span className="product-card__care-text">
            Soin : {product.careLevel}
          </span>
        </div>

        {/* Section prix + bouton (flexbox pour alignement) */}
        <div className="product-card__footer">
          {/* Prix formaté en euros */}
          <span className="product-card__price">
            {product.price.toFixed(2)}€
          </span>

          {/* 
            BUTTON : "Voir détails"
            Visible au hover (opacity gérée en CSS)
            Au clic : handleCardClick est déclenché au niveau de la carte
          */}
          <button
            className={`product-card__btn ${isHovered ? "visible" : ""}`}
            aria-label={`Voir les détails de ${product.name}`}
            type="button"
          >
            Voir détails
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
