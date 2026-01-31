/**
 * Constants for the profil (profile) page
 */

export const PROFIL_PAGE = {
  // Navigation
  backLink: {
    text: "Retour au tableau de bord",
    href: "/tableau-de-bord",
  },
  
  // Headings
  heading: "Mon profil",
  subtitle: "Gérez vos informations personnelles",
  
  // Account info section
  accountInfo: {
    title: "Informations du compte",
    description: "Aperçu de votre compte",
    labels: {
      email: "Email",
      pseudo: "Pseudo",
    },
    verification: {
      verified: "Email vérifié",
      notVerified: "Email non vérifié",
      verifiedBadge: "Compte vérifié",
      pendingBadge: "En attente",
    },
  },
  
  // Edit profile form
  editProfile: {
    title: "Modifier le profil",
    description: "Mettez à jour vos informations personnelles",
    fields: {
      pseudo: {
        label: "Pseudo",
        placeholder: "Votre pseudo",
        description: "Ce nom sera visible par les autres utilisateurs",
      },
      email: {
        label: "Email",
        placeholder: "votre@email.com",
        description: "Utilisé pour la connexion et les notifications",
      },
    },
    submitButton: "Enregistrer les modifications",
  },
  
  // Change password form
  changePassword: {
    title: "Changer le mot de passe",
    description: "Modifiez votre mot de passe de connexion",
    fields: {
      currentPassword: {
        label: "Mot de passe actuel",
        placeholder: "••••••••",
      },
      newPassword: {
        label: "Nouveau mot de passe",
        placeholder: "••••••••",
        description: "Minimum 8 caractères",
      },
      confirmPassword: {
        label: "Confirmer le nouveau mot de passe",
        placeholder: "••••••••",
      },
    },
    submitButton: "Modifier le mot de passe",
  },
  
  // Messages
  messages: {
    profileUpdateSuccess: "Profil mis à jour !",
    profileUpdateError: "Erreur lors de la mise à jour du profil",
    passwordChangeSuccess: "Mot de passe modifié !",
    passwordChangeError: "Erreur lors du changement de mot de passe",
  },
} as const;
