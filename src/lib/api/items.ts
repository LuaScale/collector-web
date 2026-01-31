/**
 * Items API functions
 */

import { apiClient, serverFetch } from "./client";
import { HydraCollection } from "@/types/hydra";
import {
  Item,
  ItemStatus,
  CreateItemPayload,
  UpdateItemPayload,
} from "@/types/entities/item";

export interface ItemsListParams {
  page?: number;
  itemsPerPage?: number;
  category?: number;
  shop?: number;
  status?: ItemStatus;
  "order[createdAt]"?: "asc" | "desc";
  "order[price]"?: "asc" | "desc";
}

export const itemsApi = {
  /**
   * List items (server-side with ISR)
   */
  list: (params?: ItemsListParams) =>
    serverFetch<HydraCollection<Item>>("/api/items", {
      params: params as Record<string, string | number | boolean | undefined>,
      revalidate: 60,
    }),

  /**
   * List items (client-side)
   */
  listClient: (params?: ItemsListParams) =>
    apiClient<HydraCollection<Item>>("/api/items", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  /**
   * Get single item by ID (server-side with ISR)
   */
  get: (id: number) =>
    serverFetch<Item>(`/api/items/${id}`, {
      revalidate: 60,
    }),

  /**
   * Get single item by ID (client-side)
   */
  getClient: (id: number) => apiClient<Item>(`/api/items/${id}`),

  /**
   * Create new item
   */
  create: (data: CreateItemPayload) =>
    apiClient<Item>("/api/items", {
      method: "POST",
      body: data,
    }),

  /**
   * Update item (PATCH)
   */
  update: (id: number, data: UpdateItemPayload) =>
    apiClient<Item>(`/api/items/${id}`, {
      method: "PATCH",
      body: data,
    }),

  /**
   * Delete item
   */
  delete: (id: number) =>
    apiClient<void>(`/api/items/${id}`, {
      method: "DELETE",
    }),
};
