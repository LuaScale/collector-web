/**
 * Constants for the edit boutique (shop) page
 */

export const EDIT_BOUTIQUE_PAGE = {
  // Navigation
  backLink: {
    text: "Retour à mes boutiques",
    href: "/tableau-de-bord/boutiques",
  },
  
  // Headings
  heading: "Modifier la boutique",
  subtitle: "Mettez à jour les informations de votre boutique",
  
  // Form
  form: {
    title: "Informations de la boutique",
    description: "Modifiez les détails de votre boutique",
    fields: {
      name: {
        label: "Nom de la boutique",
        placeholder: "Ma Super Boutique",
        description: "Le nom de votre boutique tel qu'il apparaîtra aux acheteurs",
      },
      description: {
        label: "Description",
        placeholder: "Décrivez votre boutique...",
        description: "Présentez votre boutique et vos articles aux collectionneurs",
      },
    },
    submitButton: "Enregistrer les modifications",
  },
  
  // Messages
  messages: {
    success: "Boutique mise à jour !",
    error: "Erreur lors de la mise à jour",
    loadError: "Erreur lors du chargement de la boutique",
  },
  
  // Loading
  loading: {
    message: "Chargement...",
  },
} as const;
