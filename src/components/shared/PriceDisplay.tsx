import { formatPrice } from "@/lib/utils/price";

interface PriceDisplayProps {
  /** Price in cents */
  cents: number;
  className?: string;
  locale?: string;
  currency?: string;
}

export function PriceDisplay({
  cents,
  className,
  locale = "fr-FR",
  currency = "EUR",
}: Readonly<PriceDisplayProps>) {
  return <span className={className}>{formatPrice(cents, locale, currency)}</span>;
}
