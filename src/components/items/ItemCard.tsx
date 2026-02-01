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
import { Package } from "lucide-react";

interface ItemCardProps {
  item: Item;
  showStatus?: boolean;
}

export function ItemCard({ item, showStatus = false }: Readonly<ItemCardProps>) {
  const itemId = extractId(item["@id"]);

  return (
    <Link href={`/articles/${itemId}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
        <CardHeader className="p-0">
          <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
            {/* Placeholder for item image */}
            <Package className="h-12 w-12 text-muted-foreground group-hover:scale-110 transition-transform" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            {showStatus && <ItemStatusBadge status={item.status} />}
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <PriceDisplay
            cents={item.price}
            className="text-lg font-bold text-primary"
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
