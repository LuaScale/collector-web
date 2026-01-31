import { Badge } from "@/components/ui/badge";
import { ItemStatus } from "@/types/entities/item";
import { cn } from "@/lib/utils";

interface ItemStatusBadgeProps {
  status: ItemStatus;
  className?: string;
}

const statusConfig: Record<
  ItemStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  DRAFT: {
    label: "Brouillon",
    variant: "secondary",
  },
  VALIDATED: {
    label: "Validé",
    variant: "default",
  },
  REJECTED: {
    label: "Rejeté",
    variant: "destructive",
  },
};

export function ItemStatusBadge({ status, className }: Readonly<ItemStatusBadgeProps>) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
