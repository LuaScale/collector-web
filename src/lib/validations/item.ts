import { z } from "zod";

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne doit pas dépasser 255 caractères"),
  description: z.string().optional().or(z.literal("")),
  price: z
    .number()
    .min(0, "Le prix ne peut pas être négatif"),
  category: z.string().min(1, "La catégorie est requise"),
});

export type ItemFormData = z.infer<typeof itemSchema>;

// Transform form data to API format (price in cents)
export function itemFormToApi(data: ItemFormData) {
  return {
    name: data.name,
    description: data.description || "",
    price: Math.round(data.price * 100), // Convert euros to cents
    category: data.category, // IRI
  };
}

// Transform API data to form format (price in euros)
export function itemApiToForm(item: { name: string; description?: string; price: number; category: string }): ItemFormData {
  return {
    name: item.name,
    description: item.description || "",
    price: item.price / 100, // Convert cents to euros
    category: item.category,
  };
}
