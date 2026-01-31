import { z } from "zod";

export const shopSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne doit pas dépasser 255 caractères"),
  description: z.string().optional().or(z.literal("")),
});

export type ShopFormData = z.infer<typeof shopSchema>;
