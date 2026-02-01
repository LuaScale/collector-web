"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { ItemStatus } from "@/types/entities/item";
import { cn } from "@/lib/utils";

interface ItemStatusBadgeProps {
  status: ItemStatus;
  className?: string;
}

const statusVariants: Record<
  ItemStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  DRAFT: "secondary",
  VALIDATED: "default",
  REJECTED: "destructive",
};

const statusTranslationKeys: Record<ItemStatus, string> = {
  DRAFT: "draft",
  VALIDATED: "validated",
  REJECTED: "rejected",
};

export function ItemStatusBadge({ status, className }: Readonly<ItemStatusBadgeProps>) {
  const t = useTranslations("items.status");
  const variant = statusVariants[status];
  const label = t(statusTranslationKeys[status]);

  return (
    <Badge variant={variant} className={cn(className)}>
      {label}
    </Badge>
  );
}
