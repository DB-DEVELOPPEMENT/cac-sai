// ============================================================================
// ProductDetail.jsx - PAGE DÉTAIL D'UN PRODUIT
// ============================================================================
// Rôle : Affiche un produit individuel avec image agrandie + infos complètes
// Utilise : useParams pour récupérer l'ID du produit dans l'URL
// Utilise : useContext pour récupérer le produit depuis ProductContext
// Hook pratique : useParams = INDISPENSABLE pour le routing dynamique
// ============================================================================

import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import "@/assets/Styles/ProductDetail.css";

/**
 * ProductDetail - Affiche les détails complets d'1 produit
 *
 * Hooks utilisés :
 * - useParams() : Récupère l'ID du produit depuis l'URL (/product/:id)
 * - useContext() : Récupère tous les produits du contexte global
 * - useNavigate() : Permet de naviguer (bouton "Retour" / "Catégorie")
 *
 * Logique :
 * 1. Récupère l'ID du produit depuis l'URL
 * 2. Cherche le produit dans le contexte
 * 3. Si pas trouvé → affiche 404
 * 4. Si trouvé → affiche l'image agrandie + infos
 *
 * Anticipation backend :
 * - Structure prête pour ajouter : quantité, avis, panier, wishlist
 */
const ProductDetail = () => {
  // Hook : récupère l'ID du produit depuis l'URL
  // Exemple : /product/1 → params.id = "1"
  const { id } = useParams();

  // Hook : accès au contexte global des produits
  const { getProductById } = useProducts();

  // Hook : navigation programmatique
  const navigate = useNavigate();

  // Les IDs sont des strings ("cactus-001"), comparés tels quels
  const product = getProductById(id);

  // Gestion erreur : produit non trouvé
  if (!product) {
    return (
      <section className="product-detail-error">
        <div className="error-container">
          <h2>Produit non trouvé</h2>
          <p>Désolé, ce produit n'existe pas ou a été supprimé.</p>
          <button className="btn-back" onClick={() => navigate("/")}>
            Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  /**
   * Fonction : Naviguer vers la catégorie du produit
   * Exemple : produit cactus → /cactus
   */
  const handleGoToCategory = () => {
    navigate(`/${product.category}`);
  };

  // ============================================================================
  // RENDER - Structure du détail produit
  // ============================================================================
  return (
    <section className="product-detail">
      <div className="product-detail-container">
        {/* 
          SECTION GAUCHE : Image agrandie
          Image responsive, ratio préservé, shadow
        */}
        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.name}
            className="product-image-large"
          />
        </div>

        {/* 
          SECTION DROITE : Infos produit
          Nom, description, prix, niveau soin, caractéristiques
        */}
        <div className="product-detail-info">
          {/* Catégorie (badge) */}
          <span className="product-category-badge">
            {product.category === "cactus" ? "🌵 Cactus" : "🌳 Bonsaï"}
          </span>

          {/* Nom produit */}
          <h1 className="product-detail-name">{product.name}</h1>

          {/* Prix */}
          <div className="product-detail-price">
            <span className="price-value">${product.price}</span>
            <span className="price-label">Prix unitaire</span>
          </div>

          {/* Description courte */}
          <p className="product-detail-description">{product.description}</p>

          {/* 
            Niveau de soin (indicateur visuel)
            Échelle 1-5 : facile à expert
          */}
          <div className="product-care-level">
            <label>Niveau de soin :</label>
            <div className="care-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < product.careLevel ? "filled" : "empty"}`}
                  aria-label={`Étoile ${i + 1}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="care-label">
              {product.careLevel === 1 && "Facile"}
              {product.careLevel === 2 && "Modéré"}
              {product.careLevel === 3 && "Moyen"}
              {product.careLevel === 4 && "Avancé"}
              {product.careLevel === 5 && "Expert"}
            </span>
          </div>

          {/* 
            Caractéristiques (hauteur, origine, etc.)
            Informations spécifiques du produit
          */}
          <div className="product-characteristics">
            <h3>Caractéristiques</h3>
            <ul>
              <li>
                <strong>Hauteur :</strong> {product.height}
              </li>
              <li>
                <strong>Origine :</strong> {product.origin}
              </li>
              <li>
                <strong>Arrosage :</strong> {product.watering}
              </li>
              <li>
                <strong>Lumière :</strong> {product.light}
              </li>
            </ul>
          </div>

          {/* 
            ACTIONS (Boutons)
            - Ajouter au panier (TODO : backend future)
            - Retour catégorie
            - Retour accueil
          */}
          <div className="product-detail-actions">
            {/* 
              TODO : Fonction futur backend (panier)
              <button className="btn-add-cart">
                🛒 Ajouter au panier
              </button>
            */}

            <button className="btn-category" onClick={handleGoToCategory}>
              ← Voir la catégorie
            </button>

            <button className="btn-home" onClick={() => navigate("/")}>
              🏠 Retour accueil
            </button>
          </div>

          {/* 
            SECTION FUTURE BACKEND (commentée)
            - Avis clients (rating, reviews)
            - Stock disponible
            - Promo/réduction
            - Produits similaires
          */}
          {/* 
          <div className="product-detail-reviews">
            <h3>Avis clients</h3>
            {/* Avis chargés du backend */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
