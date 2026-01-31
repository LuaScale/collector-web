/**
 * Constants for the inscription (registration) page
 */

export const INSCRIPTION_PAGE = {
  // Page metadata
  title: "Créer un compte",
  
  // Headings and descriptions
  heading: "Créer un compte",
  description: "Rejoignez la communauté Collector et commencez à vendre",
  
  // Form fields
  form: {
    email: {
      label: "Email",
      placeholder: "votre@email.com",
      autoComplete: "email",
    },
    pseudo: {
      label: "Pseudo",
      placeholder: "VotreNomDeCollectionneur",
      autoComplete: "username",
      description: "Ce nom sera visible par les autres utilisateurs",
    },
    phoneNumber: {
      label: "Téléphone",
      optionalLabel: "(optionnel)",
      placeholder: "06 12 34 56 78",
      autoComplete: "tel",
    },
    password: {
      label: "Mot de passe",
      placeholder: "••••••••",
      autoComplete: "new-password",
      description: "Minimum 8 caractères",
    },
    confirmPassword: {
      label: "Confirmer le mot de passe",
      placeholder: "••••••••",
      autoComplete: "new-password",
    },
  },
  
  // Buttons
  buttons: {
    submit: "Créer mon compte",
  },
  
  // Links
  links: {
    login: {
      text: "Déjà un compte ?",
      linkText: "Se connecter",
      href: "/connexion",
    },
  },
  
  // Routes
  routes: {
    afterRegister: "/tableau-de-bord",
  },
  
  // Messages
  messages: {
    success: "Compte créé avec succès !",
    error: "Erreur lors de l'inscription",
  },
  
  // Accessibility
  a11y: {
    pageHeading: "Inscription",
  },
} as const;
