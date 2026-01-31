import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/entities/category";
import { Tag } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  itemCount?: number;
}

export function CategoryCard({ category, itemCount }: Readonly<CategoryCardProps>) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          {typeof itemCount === "number" && (
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount > 1 ? "articles" : "article"}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
