/**
 * Shops API functions
 */

import { apiClient, serverFetch } from "./client";
import { HydraCollection } from "@/types/hydra";
import { Shop, CreateShopPayload, UpdateShopPayload } from "@/types/entities/shop";

export interface ShopsListParams {
  page?: number;
  itemsPerPage?: number;
  owner?: number;
}

export const shopsApi = {
  /**
   * List shops (server-side with ISR)
   */
  list: (params?: ShopsListParams) =>
    serverFetch<HydraCollection<Shop>>("/api/shops", {
      params: params as Record<string, string | number | boolean | undefined>,
      revalidate: 60,
    }),

  /**
   * List shops (client-side)
   */
  listClient: (params?: ShopsListParams) =>
    apiClient<HydraCollection<Shop>>("/api/shops", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  /**
   * Get single shop by ID (server-side with ISR)
   */
  get: (id: number) =>
    serverFetch<Shop>(`/api/shops/${id}`, {
      revalidate: 60,
    }),

  /**
   * Get single shop by ID (client-side)
   */
  getClient: (id: number) => apiClient<Shop>(`/api/shops/${id}`),

  /**
   * Create new shop
   */
  create: (data: CreateShopPayload) =>
    apiClient<Shop>("/api/shops", {
      method: "POST",
      body: data,
    }),

  /**
   * Update shop (PATCH)
   */
  update: (id: number, data: UpdateShopPayload) =>
    apiClient<Shop>(`/api/shops/${id}`, {
      method: "PATCH",
      body: data,
    }),

  /**
   * Delete shop
   */
  delete: (id: number) =>
    apiClient<void>(`/api/shops/${id}`, {
      method: "DELETE",
    }),
};
