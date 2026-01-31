/**
 * Users API functions
 */

import { apiClient, serverFetch } from "./client";
import { HydraCollection } from "@/types/hydra";
import { User, CreateUserPayload, UpdateUserPayload } from "@/types/entities/user";

export interface UsersListParams {
  page?: number;
  itemsPerPage?: number;
}

export const usersApi = {
  /**
   * List users (server-side with ISR)
   */
  list: (params?: UsersListParams) =>
    serverFetch<HydraCollection<User>>("/api/users", {
      params: params as Record<string, string | number | boolean | undefined>,
      revalidate: 60,
    }),

  /**
   * List users (client-side)
   */
  listClient: (params?: UsersListParams) =>
    apiClient<HydraCollection<User>>("/api/users", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  /**
   * Get single user by ID (server-side with ISR)
   */
  get: (id: number) =>
    serverFetch<User>(`/api/users/${id}`, {
      revalidate: 60,
    }),

  /**
   * Get single user by ID (client-side)
   */
  getClient: (id: number) => apiClient<User>(`/api/users/${id}`),

  /**
   * Create new user (registration)
   */
  create: (data: CreateUserPayload) =>
    apiClient<User>("/api/users", {
      method: "POST",
      body: {
        ...data,
        isVerified: false,
        roles: ["ROLE_USER"],
      },
    }),

  /**
   * Update user (PATCH)
   */
  update: (id: number, data: UpdateUserPayload) =>
    apiClient<User>(`/api/users/${id}`, {
      method: "PATCH",
      body: data,
    }),

  /**
   * Delete user
   */
  delete: (id: number) =>
    apiClient<void>(`/api/users/${id}`, {
      method: "DELETE",
    }),
};
