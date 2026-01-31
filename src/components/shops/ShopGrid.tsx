import { ShopCard } from "./ShopCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Shop } from "@/types/entities/shop";
import { Store } from "lucide-react";

interface ShopGridProps {
  shops: Shop[];
  emptyMessage?: string;
}

export function ShopGrid({
  shops,
  emptyMessage = "Aucune boutique trouvée",
}: Readonly<ShopGridProps>) {
  if (shops.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        description="Les boutiques seront bientôt disponibles."
        icon={<Store className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <ShopCard key={shop["@id"]} shop={shop} />
      ))}
    </div>
  );
}
