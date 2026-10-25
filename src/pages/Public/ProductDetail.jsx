// ============================================================================
// ProductDetail.jsx - PAGE DÉTAIL D'UN PRODUIT
// ============================================================================
// Rôle : Affiche un produit avec image encadrée + infos complètes,
//        fiche technique, conseil d'entretien, produits précédent / suivant
// Utilise : useParams pour récupérer l'ID du produit dans l'URL
// Utilise : useProducts (contexte) pour récupérer le produit
// Hook pratique : useParams = INDISPENSABLE pour le routing dynamique
// ============================================================================

import { Link, useParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import "@/assets/Styles/ProductDetail.css";

// Nombre de barres pleines de la jauge selon le niveau de soin texte de products.js
const CARE_STARS = { facile: 1, moyen: 2, difficile: 3 };

const CATEGORY_LABEL = { cactus: "Cactus", bonsai: "Bonsaï" };

// Conseil d'arrosage selon waterNeeds de products.js ('peu' | 'moyen' | 'régulier')
const CONSEILS_ARROSAGE = {
  peu: "Arrosez seulement quand le substrat est entièrement sec, et presque pas en hiver. L'excès d'eau est le premier ennemi des plantes du désert.",
  moyen: "Arrosez dès que la surface du substrat est sèche, sans jamais laisser d'eau stagner dans la soucoupe.",
  régulier: "Gardez le substrat légèrement humide : vérifiez chaque jour en été, il ne doit jamais sécher complètement.",
};

/**
 * ProductDetail - Affiche les détails complets d'1 produit
 *
 * Logique :
 * 1. Récupère l'ID du produit depuis l'URL
 * 2. Pendant le chargement du contexte → message d'attente (évite un faux "introuvable")
 * 3. Si pas trouvé → message d'erreur
 * 4. Sinon → fiche complète + navigation dans la même catégorie
 *
 * Anticipation backend :
 * - Structure prête pour ajouter : quantité, avis, panier, wishlist
 */
const ProductDetail = () => {
  const { id } = useParams();
  const { allProducts, getProductById, isLoading } = useProducts();
  const product = getProductById(id);

  if (isLoading) {
    return (
      <div className="page">
        <p className="product-detail__attente">Chargement de la fiche…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page product-detail__erreur">
        <p className="surtitre">Fiche introuvable</p>
        <h1>Ce produit n'existe pas</h1>
        <p>Il a peut-être quitté la boutique. Découvrez le reste de la collection.</p>
        <Link to="/" className="lien-accueil">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const label = CATEGORY_LABEL[product.category];
  const barresPleines = CARE_STARS[product.careLevel];

  // Précédent / suivant dans la même catégorie (on boucle aux extrémités avec %)
  const collection = allProducts.filter((p) => p.category === product.category);
  const index = collection.findIndex((p) => p.id === product.id);
  const precedent = collection[(index - 1 + collection.length) % collection.length];
  const suivant = collection[(index + 1) % collection.length];

  // Lignes de la fiche technique : [libellé, valeur] → un seul .map() dans le JSX
  const fiche = [
    ["Catégorie", label],
    ["Origine", product.origin],
    ["Hauteur", product.height],
    ["Arrosage", product.waterNeeds],
    ["Lumière", product.sunlight],
    ["Niveau de soin", product.careLevel],
    ["Prix", `${product.price.toFixed(2)} €`],
  ];

  return (
    <div className={`theme theme--${product.category}`}>
      <article className="page product-detail">
        {/* Fil d'Ariane : Accueil / Catégorie / Produit */}
        <nav className="fil-ariane" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/${product.category}`}>{label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* ===== EN-TÊTE : visuel encadré + informations ===== */}
        <section className="product-detail__hero">
          <div className="product-detail__visuel">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail__infos">
            <p className="surtitre">
              {label} · {product.origin}
            </p>
            <h1 className="product-detail__nom">{product.name}</h1>
            <p className="product-detail__sous-titre">
              {product.height} · {product.sunlight}
            </p>
            <div className="filet" aria-hidden="true" />
            <p className="product-detail__description">{product.description}</p>

            {/* Jauge de soin (3 barres) + prix, comme la "puissance" de WhiskyV2 */}
            <div className="product-detail__ligne">
              <div className="jauge">
                <span className="jauge__label">Soin {product.careLevel}</span>
                <span className="jauge__barres" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={
                        n <= barresPleines ? "jauge__barre jauge__barre--pleine" : "jauge__barre"
                      }
                    />
                  ))}
                </span>
              </div>
              <span className="product-detail__prix">{product.price.toFixed(2)} €</span>
            </div>

            <ul className="etiquettes">
              <li>Arrosage {product.waterNeeds}</li>
              <li>{product.sunlight}</li>
              <li>{product.origin}</li>
            </ul>
          </div>
        </section>

        <hr className="separateur" />

        {/* ===== CONSEIL + FICHE TECHNIQUE ===== */}
        <div className="product-detail__colonnes">
          <section>
            <p className="surtitre">Conseil</p>
            <h2 className="product-detail__titre-section">L'entretien</h2>
            <p className="product-detail__texte">{CONSEILS_ARROSAGE[product.waterNeeds]}</p>
            <blockquote className="product-detail__citation">
              Exposition idéale : {product.sunlight}.
            </blockquote>
          </section>

          <section>
            <p className="surtitre">En détail</p>
            <h2 className="product-detail__titre-section">Fiche technique</h2>
            <dl className="fiche">
              {fiche.map(([libelle, valeur]) => (
                <div key={libelle} className="fiche__ligne">
                  <dt>{libelle}</dt>
                  <dd>{valeur}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <hr className="separateur" />

        {/* ===== NAVIGATION ENTRE PRODUITS ===== */}
        <nav className="product-detail__navigation" aria-label="Autres produits">
          <Link className="nav-produit" to={`/product/${precedent.id}`}>
            <span className="nav-produit__sens">← Précédent</span>
            <span className="nav-produit__nom">{precedent.name}</span>
          </Link>

          <Link className="bouton-or" to={`/${product.category}`}>
            Toute la collection
          </Link>

          <Link className="nav-produit nav-produit--suivant" to={`/product/${suivant.id}`}>
            <span className="nav-produit__sens">Suivant →</span>
            <span className="nav-produit__nom">{suivant.name}</span>
          </Link>
        </nav>

        {/* TODO BACKEND : bouton "Ajouter au panier", avis clients, stock */}

        <p className="product-detail__retour">
          <Link to="/" className="lien-accueil">
            Retour à l'accueil
          </Link>
        </p>
      </article>
    </div>
  );
};

export default ProductDetail;
