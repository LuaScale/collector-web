"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shopsApi, ShopsListParams } from "@/lib/api/shops";
import { CreateShopPayload, UpdateShopPayload } from "@/types/entities/shop";

/**
 * Hook to fetch shops list
 */
export function useShops(params?: ShopsListParams) {
  return useQuery({
    queryKey: ["shops", params],
    queryFn: () => shopsApi.listClient(params),
  });
}

/**
 * Hook to fetch single shop
 */
export function useShop(id: number) {
  return useQuery({
    queryKey: ["shops", id],
    queryFn: () => shopsApi.getClient(id),
    enabled: id > 0,
  });
}

/**
 * Hook to create shop
 */
export function useCreateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShopPayload) => shopsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
}

/**
 * Hook to update shop
 */
export function useUpdateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateShopPayload }) =>
      shopsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      queryClient.invalidateQueries({ queryKey: ["shops", variables.id] });
    },
  });
}

/**
 * Hook to delete shop
 */
export function useDeleteShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => shopsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
}
