"use client"; // Obligatoire si tu es dans le App Router de Next.js pour utiliser useState

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ItemStatusBadge } from "./ItemStatusBadge";
import { Item } from "@/types/entities/item";
import { extractId } from "@/lib/utils/iri";
import { Package, ArrowRight } from "lucide-react";

interface ItemCardProps {
  item: Item;
  showStatus?: boolean;
}

export function ItemCard({ item, showStatus = false }: Readonly<ItemCardProps>) {
  const itemId = extractId(item["@id"]);
  const [imgError, setImgError] = useState(false);

  // Utilisation d'Unsplash avec une seed unique par ID (sig=...) pour que
  // chaque carte affiche une image différente, figée au rafraîchissement.
  const imageUrl = `https://picsum.photos/id/${(itemId * 7) % 1000}/600/600`;

  return (
    <Link href={`/articles/${itemId}`} className="block h-full group">
      <Card className="h-full overflow-hidden border border-border/80 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/45 hover:-translate-y-1.5 flex flex-col justify-between">
        <div>
          <CardHeader className="p-0">
            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative w-full">
              {!imgError ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback sur ton icône d'origine si Unsplash ne répond pas */
                <Package className="h-12 w-12 text-muted-foreground group-hover:scale-110 transition-transform duration-500" />
              )}
              {/* Glassmorphic Price Badge */}
              <div className="absolute bottom-3 right-3 z-10 bg-background/80 dark:bg-background/90 backdrop-blur-md border border-border/40 px-2.5 py-1 rounded-full shadow-xs">
                <PriceDisplay
                  cents={item.price}
                  className="text-xs sm:text-sm font-bold text-primary"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {item.name}
              </h3>
              {showStatus && <ItemStatusBadge status={item.status} />}
            </div>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </CardContent>
        </div>
        <CardFooter className="p-4 pt-3 flex items-center justify-between border-t border-muted/50 mt-auto">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Collectible</span>
          <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 transition-colors duration-300">
            Details
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
