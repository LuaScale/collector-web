/**
 * Constants for the category detail page
 */

export const CATEGORY_DETAIL_PAGE = {
  // Navigation
  backLink: {
    text: "Toutes les catégories",
    href: "/categories",
  },
  
  // Sections
  itemsCountMessage: (count: number) => `${count} article${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}`,
  emptyMessage: "Aucun article dans cette catégorie",
  
  // Metadata
  metadata: {
    notFoundTitle: "Catégorie non trouvée",
    description: (categoryName: string) => `Découvrez tous les articles de la catégorie ${categoryName}`,
  },
  
  // API configuration
  api: {
    itemsPerPage: 12,
    defaultPage: 1,
    status: "VALIDATED" as const,
    order: "desc" as const,
  },
} as const;
