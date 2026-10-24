export const products = [
    {
        id: 'cactus-001',
        name: 'Astrophytum asterias',
        category: 'cactus',
        price: 24.99,
        image: '/assets/images/cactus/astrophytum-asterias.webp',
        description: 'Cactus étoilé rare aux formes géométriques parfaites. Sans épines, texture poudreuse blanc-argenté. Très prisé des collectionneurs.',
        careLevel: 'facile', // facile | moyen | difficile
        waterNeeds: 'peu', // peu | moyen | régulier
        sunlight: 'plein soleil',
        height: '5-8 cm',
        origin: 'Mexique',
        //  TODO BACKEND : ajouter stock, sku, dimensions pot, poids pour expédition voir autres et +
    },

    {
        id: 'cactus-002',
        name: 'Echinocactus grusonii',
        category: 'cactus',
        price: 34.99,
        image: '/assets/images/cactus/echinocactus-grusonii.webp',
        description: 'Le légendaire Tonneau d\'Or. Cactus sphérique jaune doré avec épines jaune vif. Croissance lente mais impressionnante. Symbole de longévité.',
        careLevel: 'facile',
        waterNeeds: 'peu',
        sunlight: 'plein soleil',
        height: '10-15 cm',
        origin: 'Mexique',
    },

    {
        id: 'cactus-003',
        name: 'Copiapoa cinerea',
        category: 'cactus',
        price: 29.99,
        image: '/assets/images/cactus/copiapoa-cinerea.webp',
        description: 'Cactus chilien spectaculaire. Corps gris bleuté avec épines noires contrastantes. Fleurs jaune brillant en été. Très photogénique.',
        careLevel: 'moyen',
        waterNeeds: 'peu',
        sunlight: 'plein soleil',
        height: '8-12 cm',
        origin: 'Chili',
    },

    {
        id: 'cactus-004',
        name: 'Mammillaria hahniana',
        category: 'cactus',
        price: 19.99,
        image: '/assets/images/cactus/mammillaria-hahniana.webp',
        description: 'Petite merveille compacte. Épines blanches comme des cheveux. Fleurs rose-magenta en couronne. Parfait pour petit espace.',
        careLevel: 'facile',
        waterNeeds: 'peu',
        sunlight: 'lumière vive',
        height: '5-7 cm',
        origin: 'Mexique',
    },

    {
        id: 'cactus-005',
        name: 'Opuntia microdasys',
        category: 'cactus',
        price: 22.99,
        image: '/assets/images/cactus/opuntia-microdasys.webp',
        description: 'Figuier de Barbarie nain. Coussinets aplatis jaune-vert avec petites épines (glochides) dorées. Très élégant, croissance rapide.',
        careLevel: 'facile',
        waterNeeds: 'moyen',
        sunlight: 'plein soleil',
        height: '15-20 cm',
        origin: 'Mexique',
    },

    {
        id: 'cactus-006',
        name: 'Cereus monstruosus',
        category: 'cactus',
        price: 44.99,
        image: '/assets/images/cactus/cereus-monstruosus.webp',
        description: 'Forme très rare et spectaculaire. Croissance tordue et bosselée créant une silhouette surréaliste. Fleurs blanches nocturnes. Pièce de collection.',
        careLevel: 'difficile',
        waterNeeds: 'peu',
        sunlight: 'plein soleil',
        height: '20-30 cm',
        origin: 'Brésil',
    },

    //  CATÉGORIE BONSAÏ (6 produits)
    {
        id: 'bonsai-001',
        name: 'Shimpaku',
        category: 'bonsai',
        price: 79.99,
        image: '/assets/images/bonsai/shimpaku.webp',
        description: 'Genévrier japonais classique. Feuillage dense et léger. Style très travaillé avec équilibre parfait. L\'essence même du bonsaï traditionnel.',
        careLevel: 'moyen',
        waterNeeds: 'régulier',
        sunlight: 'lumière vive en extérieur',
        height: '30-40 cm',
        origin: 'Japon',
        // TODO BACKEND : système de saisons (bonsaï = cycle naturel), date taille prochaine, + autres à voir plustard
    },

    {
        id: 'bonsai-002',
        name: 'Pin noir du Japon',
        category: 'bonsai',
        price: 89.99,
        image: '/assets/images/bonsai/pin-noir-japon.webp',
        description: 'Pinacée majestueux aux aiguilles fines et robustes. Tronc puissant, écorce grise impressionnante. Style classique shihou ou moyogi.',
        careLevel: 'difficile',
        waterNeeds: 'régulier',
        sunlight: 'plein soleil extérieur',
        height: '40-50 cm',
        origin: 'Japon',
    },

    {
        id: 'bonsai-003',
        name: 'Érable d\'automne',
        category: 'bonsai',
        price: 69.99,
        image: '/assets/images/bonsai/erable-automne.webp',
        description: 'Acer palmatum spectaculaire. Feuillage délicat rouge-orangé en automne, vert tendre au printemps. Transformations saisonnières magiques.',
        careLevel: 'moyen',
        waterNeeds: 'régulier',
        sunlight: 'mi-ombre à lumière vive',
        height: '35-45 cm',
        origin: 'Japon',
    },

    {
        id: 'bonsai-004',
        name: 'Ficus retusa',
        category: 'bonsai',
        price: 54.99,
        image: '/assets/images/bonsai/ficus-retusa.webp',
        description: 'Figuier robuste et tolérant. Feuilles brillantes vert foncé, petites racines aériennes naturelles. Idéal pour débutants en bonsaï.',
        careLevel: 'facile',
        waterNeeds: 'régulier',
        sunlight: 'lumière vive intérieur/extérieur',
        height: '25-35 cm',
        origin: 'Malaisie',
    },

    {
        id: 'bonsai-005',
        name: 'Sakura en fleurs',
        category: 'bonsai',
        price: 99.99,
        image: '/assets/images/bonsai/sakura-fleurs.webp',
        description: 'Cerisier japonais miniaturisé. Floraison spectaculaire rose-blanc au printemps. Très apprécié. Essence poétique du Japon.',
        careLevel: 'difficile',
        waterNeeds: 'régulier',
        sunlight: 'plein soleil extérieur',
        height: '45-55 cm',
        origin: 'Japon',
    },

    {
        id: 'bonsai-006',
        name: 'Olivier',
        category: 'bonsai',
        price: 74.99,
        image: '/assets/images/bonsai/olivier.webp',
        description: 'Olivier méditerranéen millénaire miniaturisé. Tronc gris noueux très caractéristique. Feuillage argenté persistant. Symbole de sagesse.',
        careLevel: 'moyen',
        waterNeeds: 'moyen',
        sunlight: 'plein soleil extérieur',
        height: '35-45 cm',
        origin: 'Méditerranée',
    },
];
/**
 * FONCTIONS UTILITAIRES
 */

/**
 * Récupère tous les produits d'une catégorie
 * @param {string} category - 'cactus' ou 'bonsai'
 * @returns {Array} Tableau des produits filtrés
 * 
 * - Crée fonction dédiée :
 * - Centralise la logique de filtrage
 * - Facile à changer si structure change
 * - Prête pour futur appel API backend
 */
export const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
};

/**
 * Récupère un produit par son ID
 * @param {string} productId - L'ID unique du produit
 * @returns {Object|null} Le produit ou null si non trouvé
 */
export const getProductById = (productId) => {
    return products.find((product) => product.id === productId) || null;
};

/**
 * Récupère les statistiques de la boutique
 * @returns {Object} Nombre de produits par catégorie et total
 */
export const getProductStats = () => {
    return {
        totalProducts: products.length,
        cactusCount: getProductsByCategory('cactus').length,
        bonsaiCount: getProductsByCategory('bonsai').length,
    };
};
// Penser à revoir ma doc pour la partie backend qui viendras.