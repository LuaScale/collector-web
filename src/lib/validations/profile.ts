import { z } from "zod";

export const profileSchema = z.object({
  pseudo: z
    .string()
    .min(2, "Le pseudo doit contenir au moins 2 caractères")
    .max(50, "Le pseudo ne doit pas dépasser 50 caractères"),
  email: z.email("Adresse email invalide"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
