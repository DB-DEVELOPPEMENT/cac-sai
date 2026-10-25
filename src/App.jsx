// ============================================================================
// App.jsx - CONTENEUR PRINCIPAL DE L'APPLICATION
// ============================================================================
// Rôle : Enveloppe toute l'appli avec le contexte global + Layout standard
// Utilise ProductContext Provider pour partager les données produits
// Structure : Header → Routeur → Footer (layout standard sur toutes les pages)
// ============================================================================
// import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "@/context/ProductContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import publicRouter from "@/router/publicRouter";
import { useRoutes } from "react-router-dom";

/**
 * AppRoutes - Composant interne qui utilise les routes
 * Séparé de App pour que useRoutes() fonctionne (nécessite BrowserRouter parent)
 */
const AppRoutes = () => {
  const routes = useRoutes(publicRouter);
  return routes;
};

/**
 * App - Composant racine
 * Fournit le contexte global + Layout standard (Header/Footer)
 */
const App = () => {
  return (
    <BrowserRouter>
      {/* ProductProvider : Partage les données produits à TOUS les composants enfants */}
      <ProductProvider>
        {/* Layout standard : Header toujours visible en haut */}
        <Header />

        {/* Contenu principal : change selon la route */}
        <main className="app-main">
          <AppRoutes />
        </main>

        {/* Footer toujours visible en bas */}
        <Footer />
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
