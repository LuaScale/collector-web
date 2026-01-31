/**
 * Constants for the edit article (item) page
 */

export const EDIT_ARTICLE_PAGE = {
  // Navigation
  backLink: (shopId: number) => ({
    text: "Retour aux articles",
    href: `/tableau-de-bord/boutiques/${shopId}/articles`,
  }),
  
  // Headings
  heading: "Modifier l'article",
  subtitle: "Mettez à jour les informations de votre article",
  
  // Form
  form: {
    title: "Informations de l'article",
    description: "Modifiez les détails de votre article",
    fields: {
      title: {
        label: "Titre",
        placeholder: "Ex: Carte Pokémon Pikachu",
        description: "Donnez un titre clair et descriptif à votre article",
      },
      description: {
        label: "Description",
        placeholder: "Décrivez votre article...",
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
    submitButton: "Enregistrer les modifications",
    rejectionNote: "Cet article a été rejeté. Effectuez les modifications nécessaires et",
    rejectionAction: "cliquez sur le bouton ci-dessus",
    rejectionFinal: "pour le soumettre à nouveau.",
  },
  
  // Messages
  messages: {
    success: "Article mis à jour !",
    error: "Erreur lors de la mise à jour",
    loadError: "Erreur lors du chargement de l'article",
    categoriesLoadError: "Erreur lors du chargement des catégories",
  },
  
  // Loading
  loading: {
    message: "Chargement...",
    categories: "Chargement des catégories...",
  },
} as const;
