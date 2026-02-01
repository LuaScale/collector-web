"use client";

import { useTranslations } from "next-intl";
import { CategoryCard } from "./CategoryCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Category } from "@/types/entities/category";
import { Tag } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
  emptyMessage?: string;
}

export function CategoryGrid({
  categories,
  emptyMessage,
}: Readonly<CategoryGridProps>) {
  const t = useTranslations("categories");

  if (categories.length === 0) {
    return (
      <EmptyState
        title={emptyMessage ?? t("empty")}
        description={t("emptyDescription")}
        icon={<Tag className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category["@id"]}
          category={category}
          itemCount={category.items?.length}
        />
      ))}
    </div>
  );
}
