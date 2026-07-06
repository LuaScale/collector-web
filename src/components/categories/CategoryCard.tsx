"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/entities/category";
import { Tag } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  itemCount?: number;
}

export function CategoryCard({ category, itemCount }: Readonly<CategoryCardProps>) {
  const t = useTranslations("common");

  return (
    <Link href={`/categories/${category.slug}`} className="block h-full group">
      <Card className="h-full overflow-hidden border border-border/80 bg-card/50 backdrop-blur-xs transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/45 hover:-translate-y-1.5 flex flex-col justify-between rounded-2xl">
        <CardContent className="pt-6 pb-6 flex flex-col items-center text-center flex-grow justify-center">
          <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
            <Tag className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
          </div>
          <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors duration-300 block truncate max-w-full">
            {category.name}
          </h3>
          {typeof itemCount === "number" && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-semibold bg-muted/70 dark:bg-muted/30 px-2.5 py-0.5 rounded-full">
              {t("itemCount", { count: itemCount })}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
