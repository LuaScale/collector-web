"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { itemsApi, ItemsListParams } from "@/lib/api/items";
import { CreateItemPayload, UpdateItemPayload } from "@/types/entities/item";

/**
 * Hook to fetch items list
 */
export function useItems(params?: ItemsListParams) {
  return useQuery({
    queryKey: ["items", params],
    queryFn: () => itemsApi.listClient(params),
  });
}

/**
 * Hook to fetch single item
 */
export function useItem(id: number) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: () => itemsApi.getClient(id),
    enabled: id > 0,
  });
}

/**
 * Hook to create item
 */
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemPayload) => itemsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

/**
 * Hook to update item
 */
export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateItemPayload }) =>
      itemsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["items", variables.id] });
    },
  });
}

/**
 * Hook to delete item
 */
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => itemsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
