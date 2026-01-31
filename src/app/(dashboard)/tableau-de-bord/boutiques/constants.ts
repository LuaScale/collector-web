/**
 * Constants for the dashboard boutiques (shops) page
 */

export const DASHBOARD_BOUTIQUES_PAGE = {
  // Headings
  heading: "Mes boutiques",
  subtitle: "Gérez vos boutiques et leurs articles",
  
  // Buttons
  buttons: {
    newShop: "Nouvelle boutique",
    newShopHref: "/tableau-de-bord/boutiques/nouveau",
    edit: "Modifier",
    articles: "Articles",
    view: "Voir",
    delete: "Supprimer",
  },
  
  // Routes
  routes: {
    editShop: (shopId: number) => `/tableau-de-bord/boutiques/${shopId}`,
    shopArticles: (shopId: number) => `/tableau-de-bord/boutiques/${shopId}/articles`,
    viewShop: (shopId: number) => `/boutiques/${shopId}`,
  },
  
  // Empty state
  emptyState: {
    title: "Aucune boutique",
    description: "Créez votre première boutique pour commencer à vendre",
    actionText: "Créer ma première boutique",
  },
  
  // Dialog
  deleteDialog: {
    title: "Supprimer la boutique ?",
    description: (shopName: string) =>
      `Cette action est irréversible. La boutique "${shopName}" et tous ses articles seront supprimés définitivement.`,
    cancel: "Annuler",
    confirm: "Supprimer",
  },
  
  // Messages
  messages: {
    deleteSuccess: (shopName: string) => `Boutique "${shopName}" supprimée`,
    deleteError: "Erreur lors de la suppression",
  },
} as const;
