/**
 * Constants for the categories page
 */

export const CATEGORIES_PAGE = {
  // Page metadata
  metadata: {
    title: "Catégories",
    description: "Parcourez nos catégories d'objets de collection",
  },
  
  // Page configuration
  config: {
    itemsPerPage: 18,
    defaultPage: 1,
  },
  
  // Headings
  heading: "Catégories",
  
  // Messages
  messages: {
    categoriesCount: (count: number) => `${count} catégories disponibles`,
    error: "Impossible de charger les catégories. Veuillez réessayer plus tard.",
  },
} as const;
