// ============================================================================
// router/publicRouter.jsx - CONFIGURATION DES ROUTES PUBLIQUES
// ============================================================================
// Rôle : Définit TOUTES les routes accessibles publiquement (sans authentification)
// Framework : React Router v6 (dernière version, meilleure DX)
// Pattern : Routes nested (hiérarchie claire et maintenable)
// Anticipation backend : Structure prête pour authRouter et adminRouter
// ============================================================================

import Home from "@/pages/Public/Home";
import CategoryPage from "@/pages/Public/CategoryPage";
import ProductDetail from "@/pages/Public/ProductDetail";

/**
 * Lazy Loading (Optimisation performance)
 *
 * Les pages sont importées dinamiquement (chargées que si utilisateur y accède)
 * Réduit la taille du bundle initial (important pour le SEO + UX mobile)
 * Avec Suspense = affiche un loading pendant le chargement
 *
 * À décommenter quand les pages sont en production
 * Pour l'instant on utilise des imports directs (plus simple pour dev)
 */
// const Home = lazy(() => import('@/pages/Home'));
// const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
// const ProductDetail = lazy(() => import('@/pages/ProductDetail'));

/**
 * Routes publiques - Configuration React Router v6
 *
 * Syntaxe v6 :
 * - path : string (chemin URL)
 * - element : JSX component
 * - children : routes imbriquées (layout nested)
 *
 * Routes définies :
 * 1. "/" → Accueil (Home)
 * 2. "/cactus" → Catégorie Cactus (CategoryPage)
 * 3. "/bonsai" → Catégorie Bonsaï (CategoryPage)
 * 4. "/product/:id" → Détail produit (ProductDetail)
 * 5. "*" → 404 Not Found
 */
const publicRouter = [
  {
    // ========================================================================
    // ROUTE 1 : ACCUEIL "/"
    // ========================================================================
    // Path : racine du site
    // Element : Composant Home
    // Props : aucune (composant pure)
    // Contenu : Background + image magasin overlay
    // ========================================================================
    path: "/",
    element: <Home />,
  },

  {
    // ========================================================================
    // ROUTE 2 : CATÉGORIE CACTUS "/cactus"
    // ========================================================================
    // Path : /cactus
    // Element : CategoryPage
    // Props via useParams : category = 'cactus'
    // Contenu : Hero banner désert + grille 2 col x 3 row des 6 cactus
    // ========================================================================
    path: "/cactus",
    element: <CategoryPage />,
  },

  {
    // ========================================================================
    // ROUTE 3 : CATÉGORIE BONSAÏ "/bonsai"
    // ========================================================================
    // Path : /bonsai
    // Element : CategoryPage
    // Props via useParams : category = 'bonsai'
    // Contenu : Hero banner jardin zen + grille 2 col x 3 row des 6 bonsaïs
    // ========================================================================
    path: "/bonsai",
    element: <CategoryPage />,
  },

  {
    // ========================================================================
    // ROUTE 4 : DÉTAIL PRODUIT "/product/:id"
    // ========================================================================
    // Path : /product/:id
    //   :id = paramètre dynamique (exemple : /product/1, /product/5)
    // Element : ProductDetail
    // Hooks utilisés : useParams pour récupérer l'ID
    // Contenu : Image agrandie + infos complètes + niveau soin + caractéristiques
    // ========================================================================
    path: "/product/:id",
    element: <ProductDetail />,
  },

  {
    // ========================================================================
    // ROUTE 5 : ROUTE PAR DÉFAUT (404 Not Found)
    // ========================================================================
    // Path : "*" = toute URL non matchée
    // Affiche : Simple message 404
    // Alternative future : créer une vraie page 404.jsx avec design
    // ========================================================================
    path: "*",
    element: (
      <section className="not-found-page">
        <div className="not-found-container">
          <h1>404 - Page non trouvée</h1>
          <p>La page que vous cherchez n'existe pas.</p>
          <a href="/" className="btn-home-link">
            Retour à l'accueil
          </a>
        </div>
      </section>
    ),
  },
];

/**
 * Export de la configuration des routes
 * Utilisée dans App.jsx avec useRoutes(publicRouter)
 */
export default publicRouter;

/**
 * ============================================================================
 * STRUCTURE DE ROUTING COMPLÈTE (ANTICIPATION BACKEND)
 * ============================================================================
 *
 * Le projet actuellement n'utilise que publicRouter (routes publiques).
 *
 * Pour l'avenir (intégration backend), la structure sera :
 *
 * ├── publicRouter.jsx (routes actuelles : Home, Cactus, Bonsaï, Produit)
 * │   ├── / (Accueil)
 * │   ├── /cactus (Catégorie Cactus)
 * │   ├── /bonsai (Catégorie Bonsaï)
 * │   ├── /product/:id (Détail produit)
 * │   └── * (404)
 * │
 * ├── authRouter.jsx (routes AUTHENTIFICATION - à créer au besoin)
 * │   ├── /login (Login)
 * │   ├── /register (Inscription)
 * │   ├── /forgot-password (Récupération mot de passe)
 * │   └── /reset-password/:token
 * │
 * └── adminRouter.jsx (routes ADMINISTRATION - à créer au besoin)
 *     ├── /admin/dashboard (Tableau de bord)
 *     ├── /admin/products (Gestion produits)
 *     ├── /admin/orders (Gestion commandes)
 *     ├── /admin/users (Gestion utilisateurs)
 *     └── /admin/settings (Paramètres)
 *
 * La fusion de tous les routeurs se fera dans :
 * AppRouter.jsx = combine publicRouter + authRouter + adminRouter
 *
 * Pour maintenant : on utilise UNIQUEMENT publicRouter ✓
 */
