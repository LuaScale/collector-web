/**
 * Constants for the nouveau boutique (new shop) page
 */

export const NOUVEAU_BOUTIQUE_PAGE = {
  // Navigation
  backLink: {
    text: "Retour à mes boutiques",
    href: "/tableau-de-bord/boutiques",
  },
  
  // Headings
  heading: "Créer une boutique",
  subtitle: "Remplissez les informations de votre nouvelle boutique",
  
  // Form
  form: {
    title: "Informations de la boutique",
    description: "Renseignez les détails de votre boutique",
    fields: {
      name: {
        label: "Nom de la boutique",
        placeholder: "Ma Super Boutique",
        description: "Le nom de votre boutique tel qu'il apparaîtra aux acheteurs",
      },
      description: {
        label: "Description",
        placeholder: "Décrivez votre boutique, vos spécialités...",
        description: "Présentez votre boutique et vos articles aux collectionneurs",
      },
    },
    submitButton: "Créer la boutique",
  },
  
  // Messages
  messages: {
    success: "Boutique créée avec succès !",
    error: "Erreur lors de la création de la boutique",
  },
  
  // Routes
  routes: {
    redirectAfterCreate: (shopId: number) => `/tableau-de-bord/boutiques/${shopId}`,
  },
} as const;
