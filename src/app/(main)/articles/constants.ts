/**
 * Constants for the articles page
 */

export const ARTICLES_PAGE = {
  // Page metadata
  metadata: {
    title: "Articles",
    description: "Parcourez notre sélection d'objets de collection",
  },
  
  // Page configuration
  config: {
    itemsPerPage: 12,
    defaultPage: 1,
    status: "VALIDATED" as const,
    order: "desc" as const,
  },
  
  // Headings
  heading: "Articles",
  
  // Messages
  messages: {
    itemsCount: (count: number) => `${count} articles disponibles`,
    error: "Impossible de charger les articles. Veuillez réessayer plus tard.",
  },
} as const;
