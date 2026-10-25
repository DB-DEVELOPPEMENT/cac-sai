/* 
   PRODUCTGRID.JSX - Composant conteneur pour afficher une grille de produits
   
   Affiche : Tableau 2 colonnes × 3 rows (6 produits au total)
   
   POINTS REACT :
   - Props (reçoit tableau de produits)
   - .map() pour itérer sur les produits (pattern React fondamental)
   - Clé 'key' unique par produit (important pour React performance)
   - Composant réutilisable (peut afficher cactus OU bonsaï)
   - Pas de logique métier, juste affichage (dumb component)
   */

import ProductCard from "@/components/products/ProductCard";
import "@/assets/Styles/ProductGrid.css";

/**
 * ProductGrid - Affiche une grille de ProductCard
 *
 * Props :
 *   - products (Array) : Liste de produits [{id, name, ...}, ...]
 *   - title (String) : Titre optionnel ("Nos Cactus", "Nos Bonsaïs", etc.)
 *   - onProductClick (Function) : Callback au clic d'une carte (optionnel, tracking)
 *
 * Logique :
 *   - Affiche exactement 6 produits (ou moins s'il y en a moins)
 *   - Grille CSS Grid 2 colonnes responsive
 *   - Chaque carte est un ProductCard cliquable
 *
 * Retour : JSX grille de produits
 */
const ProductGrid = ({
  products = [],
  title = null,
  onProductClick = null,
}) => {
  // SÉCURITÉ & VALIDATION

  /**
   * Vérifier que products est bien un tableau
   * Évite les erreurs si le prop n'est pas passé ou invalide
   * Pattern défensif (anticipation future backend)
   */
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section className="product-grid">
        <div className="product-grid__empty">
          <p>Aucun produit disponible pour le moment.</p>
          <p>Revenez bientôt ! 🌱</p>
        </div>
      </section>
    );
  }

  // RENDU

  return (
    <section className="product-grid">
      {/* Titre optionnel au-dessus de la grille */}
      {title && <h2 className="product-grid__title">{title}</h2>}

      {/* 
        CONTENEUR GRILLE
        CSS Grid avec 2 colonnes (responsive via media query)
        
        PATTERN .map() FONDAMENTAL EN REACT :
        - Transforme chaque item du tableau en composant ProductCard
        - 'key' doit être UNIQUE pour chaque item (utilisé par React pour les updates)
        - Jamais utiliser l'index comme key (mauvaise pratique)
        - product.id est perfect car unique et stable
      */}
      <div className="product-grid__container">
        {products.map((product) => (
          <ProductCard
            key={product.id} // Clé unique (OBLIGATOIRE)
            product={product} // Données du produit
            onCardClick={onProductClick} // Callback optionnel
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
