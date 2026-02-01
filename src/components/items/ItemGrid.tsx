"use client";

import { useTranslations } from "next-intl";
import { ItemCard } from "./ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Item } from "@/types/entities/item";
import { Package } from "lucide-react";

interface ItemGridProps {
  items: Item[];
  showStatus?: boolean;
  emptyMessage?: string;
}

export function ItemGrid({
  items,
  showStatus = false,
  emptyMessage,
}: Readonly<ItemGridProps>) {
  const t = useTranslations("items");

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyMessage ?? t("empty")}
        description={t("emptyDescription")}
        icon={<Package className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item["@id"]} item={item} showStatus={showStatus} />
      ))}
    </div>
  );
}
