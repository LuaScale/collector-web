"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shop } from "@/types/entities/shop";
import { extractId } from "@/lib/utils/iri";
import { Store, Package } from "lucide-react";

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: Readonly<ShopCardProps>) {
  const t = useTranslations("common");
  const shopId = extractId(shop["@id"]);
  const itemCount = shop.items?.length ?? 0;

  return (
    <Link href={`/boutiques/${shopId}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Store className="h-7 w-7 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {shop.name}
              </h3>
              {shop.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {shop.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Badge variant="secondary" className="gap-1">
            <Package className="h-3 w-3" />
            {t("itemCount", { count: itemCount })}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
