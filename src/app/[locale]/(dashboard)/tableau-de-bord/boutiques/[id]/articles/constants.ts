/**
 * Constants for the shop articles management page
 */

export const SHOP_ARTICLES_PAGE = {
  // Navigation
  backLink: {
    text: "Retour à mes boutiques",
    href: "/tableau-de-bord/boutiques",
  },
  
  // Headings
  heading: (shopName: string) => `Articles de ${shopName}`,
  subtitle: "Gérez les articles de votre boutique",
  
  // Table
  table: {
    headers: {
      title: "Titre",
      price: "Prix",
      category: "Catégorie",
      status: "Statut",
      actions: "Actions",
    },
  },
  
  // Buttons
  buttons: {
    addArticle: "Nouvel article",
    edit: "Modifier",
    delete: "Supprimer",
  },
  
  // Routes
  routes: {
    newArticle: (shopId: number) => `/tableau-de-bord/boutiques/${shopId}/articles/nouveau`,
    editArticle: (shopId: number, itemId: number) => `/tableau-de-bord/boutiques/${shopId}/articles/${itemId}`,
  },
  
  // Empty state
  emptyState: {
    title: "Aucun article",
    description: "Ajoutez votre premier article à cette boutique",
    actionText: "Ajouter un article",
  },
  
  // Delete dialog
  deleteDialog: {
    title: "Supprimer l'article ?",
    description: (itemTitle: string) => `Êtes-vous sûr de vouloir supprimer "${itemTitle}" ? Cette action est irréversible.`,
    cancel: "Annuler",
    confirm: "Supprimer",
  },
  
  // Messages
  messages: {
    deleteSuccess: (itemTitle: string) => `Article "${itemTitle}" supprimé`,
    deleteError: "Erreur lors de la suppression",
    loadError: "Erreur lors du chargement des articles",
  },
  
  // Loading
  loading: {
    message: "Chargement...",
  },
} as const;
