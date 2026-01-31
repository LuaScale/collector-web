/**
 * Constants for the article detail page
 */

export const ARTICLE_DETAIL_PAGE = {
  // Navigation
  backLink: {
    text: "Retour aux articles",
    href: "/articles",
  },
  
  // Sections
  description: {
    heading: "Description",
  },
  
  // Sidebar
  sidebar: {
    publishedLabel: "Publié le",
    categoryLabel: "Catégorie",
    shopLabel: "Vendeur",
  },
  
  // Contact
  contact: {
    button: "Contacter le vendeur",
  },
  
  // Metadata
  metadata: {
    notFoundTitle: "Article non trouvé",
  },
} as const;
