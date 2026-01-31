import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .regex(emailRegex, "Email invalide")
    .max(180, "L'email ne doit pas dépasser 180 caractères"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "L'email est requis")
      .regex(emailRegex, "Email invalide")
      .max(180, "L'email ne doit pas dépasser 180 caractères"),
    pseudo: z
      .string()
      .min(1, "Le pseudo est requis")
      .max(50, "Le pseudo ne doit pas dépasser 50 caractères"),
    phoneNumber: z
      .string()
      .max(20, "Le numéro ne doit pas dépasser 20 caractères")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
