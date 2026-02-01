/**
 * Constants for the boutiques (shops) page
 */

export const BOUTIQUES_PAGE = {
  // Page metadata
  metadata: {
    title: "Boutiques",
    description: "Découvrez les boutiques de nos vendeurs passionnés",
  },
  
  // Page configuration
  config: {
    itemsPerPage: 12,
    defaultPage: 1,
  },
  
  // Headings
  heading: "Boutiques",
  
  // Messages
  messages: {
    shopsCount: (count: number) => `${count} boutiques de collectionneurs`,
    error: "Impossible de charger les boutiques. Veuillez réessayer plus tard.",
  },
} as const;
