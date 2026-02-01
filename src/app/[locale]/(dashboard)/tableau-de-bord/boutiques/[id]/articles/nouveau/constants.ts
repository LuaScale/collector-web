/**
 * Constants for the nouveau article (new item) page
 */

export const NOUVEAU_ARTICLE_PAGE = {
  // Navigation
  backLink: (shopId: number) => ({
    text: "Retour aux articles",
    href: `/tableau-de-bord/boutiques/${shopId}/articles`,
  }),
  
  // Headings
  heading: "Ajouter un article",
  subtitle: "Créez un nouvel article pour votre boutique",
  
  // Form
  form: {
    title: "Informations de l'article",
    description: "Renseignez les détails de votre article",
    fields: {
      title: {
        label: "Titre",
        placeholder: "Ex: Carte Pokémon Pikachu",
        description: "Donnez un titre clair et descriptif à votre article",
      },
      description: {
        label: "Description",
        placeholder: "Décrivez votre article, son état, ses caractéristiques...",
        description: "Détaillez votre article pour attirer les acheteurs",
      },
      price: {
        label: "Prix (€)",
        placeholder: "0.00",
        description: "Prix de vente en euros",
      },
      category: {
        label: "Catégorie",
        placeholder: "Sélectionnez une catégorie",
        selectPrompt: "Choisir une catégorie",
        description: "Catégorie de l'article",
      },
    },
    submitButton: "Créer l'article",
    statusNote: "Votre article sera créé en statut",
    statusValue: "PENDING",
    statusExplanation: "et devra être validé par un modérateur avant d'être visible.",
  },
  
  // Messages
  messages: {
    success: "Article créé avec succès !",
    error: "Erreur lors de la création de l'article",
    categoriesLoadError: "Erreur lors du chargement des catégories",
  },
  
  // Routes
  routes: {
    redirectAfterCreate: (shopId: number) => `/tableau-de-bord/boutiques/${shopId}/articles`,
  },
  
  // Loading
  loading: {
    categories: "Chargement des catégories...",
  },
} as const;
