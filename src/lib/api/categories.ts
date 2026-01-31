/**
 * Categories API functions
 */

import { apiClient, serverFetch } from "./client";
import { HydraCollection } from "@/types/hydra";
import {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/types/entities/category";

export interface CategoriesListParams {
  page?: number;
  itemsPerPage?: number;
}

export const categoriesApi = {
  /**
   * List categories (server-side with ISR)
   */
  list: (params?: CategoriesListParams) =>
    serverFetch<HydraCollection<Category>>("/api/categories", {
      params: params as Record<string, string | number | boolean | undefined>,
      revalidate: 300, // Categories change less frequently
    }),

  /**
   * List categories (client-side)
   */
  listClient: (params?: CategoriesListParams) =>
    apiClient<HydraCollection<Category>>("/api/categories", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  /**
   * Get single category by ID (server-side with ISR)
   */
  get: (id: number) =>
    serverFetch<Category>(`/api/categories/${id}`, {
      revalidate: 300,
    }),

  /**
   * Get category by slug
   */
  getBySlug: async (slug: string): Promise<Category | null> => {
    const collection = await serverFetch<HydraCollection<Category>>(
      "/api/categories",
      {
        params: { slug },
        revalidate: 300,
      }
    );
    const members = collection["hydra:member"] ?? collection["member"] ?? [];
    return members[0] || null;
  },

  /**
   * Get single category by ID (client-side)
   */
  getClient: (id: number) => apiClient<Category>(`/api/categories/${id}`),

  /**
   * Create new category
   */
  create: (data: CreateCategoryPayload) =>
    apiClient<Category>("/api/categories", {
      method: "POST",
      body: data,
    }),

  /**
   * Update category (PATCH)
   */
  update: (id: number, data: UpdateCategoryPayload) =>
    apiClient<Category>(`/api/categories/${id}`, {
      method: "PATCH",
      body: data,
    }),

  /**
   * Delete category
   */
  delete: (id: number) =>
    apiClient<void>(`/api/categories/${id}`, {
      method: "DELETE",
    }),
};
