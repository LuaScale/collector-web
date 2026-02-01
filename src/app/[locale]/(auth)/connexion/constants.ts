/**
 * Constants for the connexion (login) page
 */

export const CONNEXION_PAGE = {
  // Page metadata
  title: "Connexion",
  
  // Headings and descriptions
  heading: "Connexion",
  description: "Connectez-vous à votre compte Collector",
  
  // Form fields
  form: {
    email: {
      label: "Email",
      placeholder: "votre@email.com",
      autoComplete: "email",
    },
    password: {
      label: "Mot de passe",
      placeholder: "••••••••",
      autoComplete: "current-password",
    },
  },
  
  // Buttons
  buttons: {
    submit: "Se connecter",
  },
  
  // Links
  links: {
    register: {
      text: "Pas encore de compte ?",
      linkText: "Créer un compte",
      href: "/inscription",
    },
  },
  
  // Routes
  routes: {
    afterLogin: "/tableau-de-bord",
  },
  
  // Messages
  messages: {
    success: "Connexion réussie !",
    error: "Erreur de connexion",
  },
  
  // Accessibility
  a11y: {
    pageHeading: "Connexion",
  },
} as const;
