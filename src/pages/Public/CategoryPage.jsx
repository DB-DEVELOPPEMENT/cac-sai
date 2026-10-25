/* page d'affichages des produits par catégories (bonsai, cactus, etc.)

 Routes associées :
   - /cactus → affiche les 6 cactus
   - /bonsai → affiche les 6 bonsaïs
   
   POINTS REACT :
   - useParams() pour extraire 'category' de l'URL
   - useContext() pour accéder aux produits globaux
   - useEffect() pour filtrer et formater les données
   - useState() pour gérer l'état local (affichage)
   - Composition de composants (Header + CategoryPage + Footer)

- useMemo() pour mémoïser le filtrage des produits (optimisation)

En React, le Hook useMemo sert à mettre en cache (mémoïser) le résultat d'un calcul d'un rendu à l'autre.
Il évite de refaire des calculs lourds ou coûteux à chaque fois que le composant se ré-affiche (se re-render),
à moins que les données dont il dépend n'aient changé

   ============================================================================ */

import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import "@/assets/Styles/CategoryPage.css";

/**
 * CategoryPage - Affiche tous les produits d'une catégorie (Cactus ou Bonsaï)
 *
 * Flow React :
 * 1. URL change → useParams() capture 'category'
 * 2. useEffect() se déclenche → filtre les produits du contexte
 * 3. state change → re-render avec ProductGrid
 * 4. L'utilisateur voit la grille 2 col × 3 row
 *
 * À AMÉLIORER POUR LE BACKEND :
 * - Remplacer le filtrage local par un appel API GET /api/products?category=cactus
 * - Ajouter pagination si > 6 produits
 * - Ajouter tri/filtres (prix, soin level, etc.)
 * - Gestion loading/error states (voir TODO plus bas)
 */
const CategoryPage = () => {
  // ─────────────────────────────────────────────────────────────────────
  // HOOKS REACT
  // ─────────────────────────────────────────────────────────────────────

  /**
   * useParams - Récupère les paramètres de l'URL
   * Exemple : /cactus → { category: 'cactus' }
   * Permet de rendre la page dynamique selon la route
   */
  // Les routes sont statiques (/cactus, /bonsai) : pas de :category, donc on lit le chemin.
  const category = useLocation().pathname.slice(1);

  /**
   * useContext - Accède aux données produits partagées globalement
   * ProductContext contient 'products' et 'getProductsByCategory()'
   * Évite de passer les props manuellement à travers tous les composants
   */
  const { allProducts: products } = useProducts();

  // Les produits filtrés sont dérivés du contexte et de l'URL, pas stockés en state.
  const filteredProducts = useMemo(() => {
    if (!category || !products.length) return [];

    const normalizedCategory = category.toLowerCase();
    return products.filter(
      (product) => product.category.toLowerCase() === normalizedCategory,
    );
  }, [category, products]);

  // ─────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────

  /**
   * getCategoryDisplay - Formatte le titre de la page
   * Retourne : "Nos Cactus" ou "Nos Bonsaïs"
   */
  const getCategoryDisplay = () => {
    if (!category) return "Produits";

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return `Nos ${categoryTitle}${categoryTitle === "Bonsai" ? "s" : ""}`;
  };

  /**
   * getBackgroundClass - Retourne la classe CSS du background
   * Chaque catégorie a son propre background (désert vs jardin zen)
   */
  const getBackgroundClass = () => {
    return category === "cactus"
      ? "category-page--desert"
      : "category-page--zen";
  };

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────

  return (
    <div className={`category-page ${getBackgroundClass()}`}>
      {/* 
        BANNEAU HERO
        Titre de la catégorie + sous-titre court
        Background différent selon la catégorie
      */}
      <div className="category-page__hero">
        <div className="category-page__hero-content">
          <h1 className="category-page__title">{getCategoryDisplay()}</h1>
          <p className="category-page__subtitle">
            {category === "cactus"
              ? "Découvrez nos espèces les plus résistantes et spectaculaires"
              : "Admirez nos plus beaux spécimens d'art vivant"}
          </p>
        </div>
      </div>

      {/* 
        GRILLE DE PRODUITS
        ProductGrid affiche 2 colonnes × 3 rows (6 produits)
        Props :
        - products: filteredProducts (déjà filtrés par catégorie)
        - title: "Voir nos produits" ou rien
      */}
      <div className="category-page__content">
        <ProductGrid
          products={filteredProducts}
          title={`${filteredProducts.length} produits disponibles`}
        />
      </div>

      {/* 
        SECTION VIDE (optionnel)
        Affichée si pas de produits (utile pour debugging)
      */}
      {filteredProducts.length === 0 && (
        <div className="category-page__empty">
          <p>Aucun produit trouvé pour cette catégorie.</p>
          <p>Revenez bientôt pour découvrir nos nouvelles collections ! 🌱</p>
        </div>
      )}

      {/* 
        TODO - FUTURE BACKEND INTEGRATION
        
        Ajouter les states :
        - isLoading : afficher un spinner pendant la requête
        - error : afficher un message d'erreur si API fail
        
        Exemple structure :
        {isLoading && <LoadingSpinner />}
        {error && <ErrorBanner message={error} />}
      */}
    </div>
  );
};

export default CategoryPage;
