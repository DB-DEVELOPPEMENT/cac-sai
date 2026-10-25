import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import "@/assets/Styles/Footer.css"; // Styles du footer

export default function Footer() {
  const navigate = useNavigate();
  const { handleCategoryChange } = useProducts();
  /**
   * Gérer le click sur une catégorie
   * @param {string} category - 'bonsai' ou 'cactus'
   * @param {string} path - '/bonsai' ou '/cactus'
   */
  const handleCategoryClick = (category, path) => {
    // Étape 1 : Changer la catégorie active dans le Context
    handleCategoryChange(category);

    // Étape 2 : Naviguer vers la page de cette catégorie
    navigate(path);
  };
  /* JSX RETURN */
  return (
    <footer className="footer">
      {/* ========== SECTION CATÉGORIES (Gauche) ========== */}
      <div className="footer__categories">
        {/* Catégorie 1 : Bonsaï */}
        <button
          className="footer__category"
          onClick={() => handleCategoryClick("bonsai", "/bonsai")}
          aria-label="Voir les bonsaïs"
        >
          <span className="footer__category-number">01</span>
          <span className="footer__category-name">Bonsaï</span>
        </button>

        {/* Catégorie 2 : Cactus */}
        <button
          className="footer__category"
          onClick={() => handleCategoryClick("cactus", "/cactus")}
          aria-label="Voir les cactus"
        >
          <span className="footer__category-number">02</span>
          <span className="footer__category-name">Cactus</span>
        </button>
      </div>

      {/* ========== SIGNATURE (Droite/Bas) ========== */}
      <div className="footer__signature">
        <p>
          © 2024 – 2026 · Conçu et développé par{" "}
          <span className="footer__signature-highlight">DB-Développement</span>
        </p>
      </div>
    </footer>
  );
}

/* PENSER à revoir ma doc && TODO BACKEND */
