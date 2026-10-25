import { Link } from "react-router-dom";
import "@/assets/Styles/ProductCard.css";

/**
 * ProductCard - Une carte de la grille : toute la carte est un lien vers la fiche.
 *
 * Pourquoi <Link> plutôt qu'un onClick + navigate() ?
 * - c'est un vrai lien : clavier (Tab + Entrée), clic molette, "ouvrir dans un onglet"
 * - pas besoin de state pour le survol : les effets sont gérés en CSS (:hover)
 *
 * Props :
 *   - product (Object) : { id, name, category, origin, careLevel, height, price, image }
 */
const ProductCard = ({ product }) => {
  return (
    <li className="product-card">
      <Link className="product-card__lien" to={`/product/${product.id}`}>
        {/* Visuel encadré d'un double filet doré (voir ProductCard.css) */}
        <span className="product-card__visuel">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        </span>

        <span className="product-card__origine">
          {product.category === "cactus" ? "Cactus" : "Bonsaï"} · {product.origin}
        </span>
        <span className="product-card__nom">{product.name}</span>
        <span className="product-card__infos">
          Soin {product.careLevel} · {product.height}
        </span>
        <span className="product-card__prix">{product.price.toFixed(2)} €</span>
        <span className="product-card__cta">Découvrir la fiche →</span>
      </Link>
    </li>
  );
};

export default ProductCard;
