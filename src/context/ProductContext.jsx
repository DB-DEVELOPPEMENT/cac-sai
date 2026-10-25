import { createContext, useContext, useState, useEffect } from 'react';
import { products as productsData } from '@/data/products';

/**
 * Étape 1 : Créer le Context
 * C'est l'objet qui va transporter nos données
 */
const ProductContext = createContext();

/**
 * Étape 2 : Créer le Provider (le composant qui encapsule tout)
 * 
 * Le Provider est comme un "conteneur invisible" autour de toute l'appli.
 * Il fournit les données à tous ses enfants.
 * 
 * @param {Object} props - Props du composant
 * @param {React.ReactNode} props.children - Tous les composants enfants
 */
export const ProductProvider = ({ children }) => {
 
  //  ÉTATS (État = données qui changent)
  

  /**
   * État 1 : Tous les produits
   * 
   * POURQUOI useState ?
   * - Permet à React de "réagir" si les produits changent
   * - Si produits changent → re-render automatique
   * - Exemple futur : ajout au panier change le nombre de produits
   */
  const [allProducts, setAllProducts] = useState([]);

  /**
    * État 2 : Catégorie active
   * Valeurs possibles : 'all' | 'cactus' | 'bonsai'
   */
  const [activeCategory, setActiveCategory] = useState('all');

  /**
  * État 3 : État de chargement
   * 
   *  POURQUOI isLoading ?
   * - Pendant qu'on charge les produits, afficher "Chargement..."
   * - Évite afficher une page vide pendant 1-2 secondes
   * - Futur : utile quand on charge depuis l'API
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
  * État 4 : Message d'erreur
   * Si chargement échoue, afficher l'erreur à l'utilisateur
   */
  const [error, setError] = useState(null);

 
  //  EFFET (Effect = action au montage/changement)
  

  /**
   * useEffect 1 : Charger les produits au démarrage
   * 
   *  COMMENT ÇA MARCHE ?
   * - [] (dépendances vides) = s'exécute UNE FOIS au montage
   * - Charge les produits depuis products.js
   * - Simule un délai (comme une vraie API)
   * - Remplacera plus tard par : fetch('/api/products')
   */
  useEffect(() => {
    // Fonction asynchrone pour charger
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simule un délai API (200ms)
        // FUTUR : Remplacer par fetch('/api/products')
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Charge les produits depuis data/products.js
        setAllProducts(productsData);

        setIsLoading(false);
      } catch (err) {
        console.error('Erreur chargement produits :', err);
        setError('Impossible de charger les produits');
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []); // [] = s'exécute une seule fois au montage

  // Produits dérivés de la catégorie active, sans état redondant ni effet.
  const filteredProducts =
    activeCategory === 'all'
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

 
  //  FONCTIONS UTILITAIRES
 

  /**
   * Récupérer un produit par son ID
   * @param {string} productId
   * @returns {Object|null}
   */
  const getProductById = (productId) => {
    return allProducts.find((p) => p.id === productId) || null;
  };

  /**
   * Changer de catégorie active
   * @param {string} category - 'all' | 'cactus' | 'bonsai'
   *
   *  EXEMPLE D'UTILISATION
   * Si tu cliques le footer "Catégorie Cactus" :
   * handleCategoryChange('cactus')
   * → activeCategory devient 'cactus'
   * → useEffect se déclenche
   * → filteredProducts = que cactus
   * → tous les composants se re-rendent
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  
  //  VALEUR DU CONTEXT
  

  /**
   * C'est tout ce qui sera accessible dans l'appli
   * avec : const { products, isLoading } = useContext(ProductContext);
   */
  const value = {
    // Données
    allProducts,
    filteredProducts,
    activeCategory,
    isLoading,
    error,

    // Fonctions
    getProductById,
    handleCategoryChange,

    // Stats
    totalProducts: allProducts.length,
    cactusCount: allProducts.filter((p) => p.category === 'cactus').length,
    bonsaiCount: allProducts.filter((p) => p.category === 'bonsai').length,
  };

  
  //  RENDER DU PROVIDER
  

  /**
   * ProductContext.Provider = "conteneur invisible" autour de tous les enfants
   * value={value} = les données à partager
   * {children} = tous les composants enfants (Header, Home, Footer, etc.)
   */
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

/**
 
 * CUSTOM HOOK : useProducts()
 
 * 
 *  QU'EST-CE QU'UN CUSTOM HOOK ?
 * Une fonction qu'on crée pour simplifier l'utilisation du Context.
 * 
 *  POURQUOI L'UTILISER ?
 * Au lieu d'écrire partout :
 *   const context = useContext(ProductContext);
 *   if (!context) throw new Error('ProductProvider manquant');
 * 
 * On écrit juste :
 *   const { products, isLoading } = useProducts();
 * 
 * Plus court, plus lisible, réutilisable partout.
 * C'est une bonne pratique pro !
 * 
 */

// This hook intentionally shares the context module with its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);

  // Vérification : s'assurer que le hook est utilisé DANS ProductProvider
  if (!context) {
    throw new Error(
      ' useProducts() doit être utilisé DANS <ProductProvider>\n' +
        'Vérifie que App.jsx enveloppe tout avec <ProductProvider>'
    );
  }

  return context;
};
