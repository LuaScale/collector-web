/**
 * Price utilities for converting between cents and display format
 * API stores prices as integers in cents to avoid floating-point issues
 */

const DEFAULT_LOCALE = "fr-FR";
const DEFAULT_CURRENCY = "EUR";

/**
 * Format price from cents to display string
 * @example formatPrice(25000) => "250,00 €"
 */
export function formatPrice(
  cents: number,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): string {
  const euros = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(euros);
}

/**
 * Convert euros to cents for API submission
 * @example eurosToCents(250.00) => 25000
 */
export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

/**
 * Convert cents to euros for form input
 * @example centsToEuros(25000) => 250.00
 */
export function centsToEuros(cents: number): number {
  return cents / 100;
}

/**
 * Parse price input string to cents
 * Handles both "250" and "250,00" or "250.00" formats
 */
export function parsePriceInput(input: string): number {
  // Replace comma with dot for parsing
  const normalized = input.replace(",", ".");
  const euros = Number.parseFloat(normalized);
  if (Number.isNaN(euros)) return 0;
  return eurosToCents(euros);
}
