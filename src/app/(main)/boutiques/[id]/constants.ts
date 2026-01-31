/**
 * Constants for the boutique detail page
 */

export const BOUTIQUE_DETAIL_PAGE = {
  // Navigation
  backLink: {
    text: "Toutes les boutiques",
    href: "/boutiques",
  },
  
  // Sections
  heading: (shopName: string) => `Articles de ${shopName}`,
  emptyMessage: "Cette boutique n'a pas encore d'articles en vente",
  
  // Shop info
  shopInfo: {
    ownerLabel: "Propriétaire",
    itemsLabel: (count: number) => `${count} article${count > 1 ? 's' : ''}`,
  },
  
  // Metadata
  metadata: {
    notFoundTitle: "Boutique non trouvée",
    defaultDescription: (shopName: string) => `Découvrez la boutique ${shopName}`,
  },
  
  // API configuration
  api: {
    itemsPerPage: 12,
    defaultPage: 1,
    status: "VALIDATED" as const,
    order: "desc" as const,
  },
} as const;
