/**
 * Constants for the main homepage
 */

export const HOMEPAGE = {
  // API configuration
  api: {
    itemsPerPage: 8,
    categoriesPerPage: 6,
    order: {
      items: "desc" as const,
    },
    status: "VALIDATED" as const,
  },
  
  // Hero section
  hero: {
    title: {
      before: "La marketplace des",
      highlighted: "collectionneurs",
      after: "passionnés",
    },
    description: "Découvrez des pièces rares et uniques : figurines vintage, jouets rétro, comics et bien plus encore. Rejoignez notre communauté de collectionneurs.",
    cta: {
      primary: {
        text: "Parcourir les articles",
        href: "/articles",
      },
      secondary: {
        text: "Créer ma boutique",
        href: "/inscription",
      },
    },
  },
  
  // Features section
  features: [
    {
      title: "Articles uniques",
      description: "Des milliers d'objets de collection rares et authentiques",
    },
    {
      title: "Boutiques vérifiées",
      description: "Des vendeurs passionnés et de confiance",
    },
    {
      title: "Prix transparents",
      description: "Des prix justes pour les collectionneurs",
    },
  ],
  
  // Categories section
  categories: {
    heading: "Catégories populaires",
    viewAllText: "Voir toutes",
    viewAllHref: "/categories",
  },
  
  // Latest items section
  latestItems: {
    heading: "Derniers articles",
    viewAllText: "Voir tous les articles",
    viewAllHref: "/articles",
  },
  
  // CTA section
  cta: {
    heading: "Prêt à vendre vos trésors ?",
    description: "Créez votre boutique gratuitement et rejoignez notre communauté de vendeurs passionnés.",
    buttonText: "Commencer maintenant",
    buttonHref: "/inscription",
  },
} as const;
