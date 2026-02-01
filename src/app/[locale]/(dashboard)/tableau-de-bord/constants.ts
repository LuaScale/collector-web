/**
 * Constants for the main dashboard page (tableau-de-bord)
 */

export const DASHBOARD_PAGE = {
  // Headings
  greeting: (userName: string) => `Bonjour, ${userName} 👋`,
  defaultUserName: "Vendeur",
  subtitle: "Bienvenue sur votre tableau de bord",
  
  // Stats cards
  stats: {
    shops: {
      label: "Mes boutiques",
    },
    items: {
      label: "Total articles",
    },
    status: {
      label: "Statut",
      verified: "Vérifié",
      notVerified: "Non vérifié",
      verifiedMessage: "Votre compte est vérifié",
      notVerifiedMessage: "Vérifiez votre email",
    },
  },
  
  // Quick actions
  quickActions: {
    heading: "Actions rapides",
    createShop: {
      text: "Créer une boutique",
      href: "/tableau-de-bord/boutiques/nouveau",
    },
    manageShops: {
      text: "Gérer mes boutiques",
      href: "/tableau-de-bord/boutiques",
    },
  },
  
  // Recent shops section
  recentShops: {
    heading: "Mes boutiques",
    viewAllText: "Voir tout",
    viewAllHref: "/tableau-de-bord/boutiques",
    emptyMessage: "Vous n'avez pas encore de boutique",
    itemsLabel: (count: number) => `${count} articles`,
  },
} as const;
