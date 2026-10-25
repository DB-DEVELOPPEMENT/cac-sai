/*
   PRODUCTGRID.JSX - Composant conteneur pour afficher une grille de produits

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
 *   - title (String) : Libellé optionnel au-dessus de la grille ("6 spécimens")
 */
const ProductGrid = ({ products = [], title = null }) => {
  // Pattern défensif : rien à afficher → message, pas une grille vide
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section className="product-grid">
        <p className="product-grid__empty">
          Aucun produit disponible pour le moment. Revenez bientôt !
        </p>
      </section>
    );
  }

  return (
    <section className="product-grid">
      {title && <h2 className="product-grid__title">{title}</h2>}

      {/*
        PATTERN .map() FONDAMENTAL EN REACT :
        - Transforme chaque item du tableau en composant ProductCard
        - 'key' doit être UNIQUE et stable : product.id (jamais l'index)
        - <ul>/<li> : une liste de produits est sémantiquement une liste
      */}
      <ul className="product-grid__container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductGrid;
