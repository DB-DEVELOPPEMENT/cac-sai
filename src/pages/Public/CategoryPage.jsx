/* page d'affichages des produits par catégories (bonsai, cactus, etc.)

 Routes associées :
   - /cactus → affiche les 6 cactus
   - /bonsai → affiche les 6 bonsaïs

   POINTS REACT :
   - useLocation() pour lire la catégorie dans l'URL
   - useProducts() (contexte) pour accéder aux produits globaux
   - useMemo() pour mémoïser le filtrage des produits (optimisation)
   - Objet de configuration (CATEGORIES) au lieu de if/else dans le JSX

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
 * Textes et thème de chaque catégorie, au même endroit.
 * Ajouter une catégorie = ajouter une entrée ici (et sa route).
 */
const CATEGORIES = {
  cactus: {
    surtitre: "La collection · Désert",
    titre: "Nos cactus",
    intro:
      "Sculptés par le soleil et la patience, nos cactus réunissent des espèces rares du Mexique, du Chili et du Brésil. Peu d'eau, beaucoup de lumière : la force tranquille du désert.",
  },
  bonsai: {
    surtitre: "La collection · Jardin zen",
    titre: "Nos bonsaïs",
    intro:
      "Façonnés pendant des années, nos bonsaïs sont des paysages vivants en miniature. Genévriers, pins, érables ou cerisiers : chaque arbre raconte une saison.",
  },
};

/**
 * CategoryPage - Affiche tous les produits d'une catégorie (Cactus ou Bonsaï)
 *
 * À AMÉLIORER POUR LE BACKEND :
 * - Remplacer le filtrage local par un appel API GET /api/products?category=cactus
 * - Ajouter pagination si > 6 produits
 * - Ajouter tri/filtres (prix, soin level, etc.)
 */
const CategoryPage = () => {
  // Les routes sont statiques (/cactus, /bonsai) : pas de :category, donc on lit le chemin.
  const category = useLocation().pathname.slice(1);
  const infos = CATEGORIES[category];

  const { allProducts: products, isLoading } = useProducts();

  // Les produits filtrés sont dérivés du contexte et de l'URL, pas stockés en state.
  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === category),
    [category, products],
  );

  return (
    <div className={`theme theme--${category}`}>
      <div className="page category-page">
        {/* EN-TÊTE : sur-titre doré, grand titre gravé, filet, introduction */}
        <header className="category-page__hero">
          <p className="surtitre">{infos.surtitre}</p>
          <h1 className="category-page__title">{infos.titre}</h1>
          <div className="filet" aria-hidden="true" />
          <p className="category-page__intro">{infos.intro}</p>
        </header>

        {/* Pendant le chargement (200 ms simulés), on n'affiche pas "aucun produit" */}
        {isLoading ? (
          <p className="category-page__loading">Chargement de la collection…</p>
        ) : (
          <ProductGrid
            products={filteredProducts}
            title={`${filteredProducts.length} spécimens`}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
