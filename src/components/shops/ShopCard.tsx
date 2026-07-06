"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shop } from "@/types/entities/shop";
import { extractId } from "@/lib/utils/iri";
import { Store, Package, ArrowRight } from "lucide-react";

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: Readonly<ShopCardProps>) {
  const t = useTranslations("common");
  const shopId = extractId(shop["@id"]);
  const itemCount = shop.items?.length ?? 0;

  return (
    <Link href={`/boutiques/${shopId}`} className="block h-full group">
      <Card className="h-full overflow-hidden border border-border/80 bg-card/50 backdrop-blur-xs transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/45 hover:-translate-y-1.5 flex flex-col justify-between rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
              <Store className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors duration-300">
                {shop.name}
              </h3>
              {shop.description && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-2">
                  {shop.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-3 border-t border-muted/50 flex items-center justify-between mt-auto">
          <Badge variant="secondary" className="gap-1 bg-muted-foreground/10 text-muted-foreground font-semibold border-none rounded-full px-2.5 py-0.5">
            <Package className="h-3 w-3" />
            {t("itemCount", { count: itemCount })}
          </Badge>
          <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 transition-colors duration-300">
            Visit
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
