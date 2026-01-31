/**
 * Date formatting utilities
 */

const DEFAULT_LOCALE = "fr-FR";

/**
 * Format ISO date string to localized display
 * @example formatDate("2026-01-28T10:30:00Z") => "28 janvier 2026"
 */
export function formatDate(
  isoString: string,
  locale: string = DEFAULT_LOCALE
): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Format ISO date string with time
 * @example formatDateTime("2026-01-28T10:30:00Z") => "28 janvier 2026 à 10:30"
 */
export function formatDateTime(
  isoString: string,
  locale: string = DEFAULT_LOCALE
): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Format relative time (e.g., "il y a 2 jours")
 */
export function formatRelativeTime(
  isoString: string,
  locale: string = DEFAULT_LOCALE
): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  }
  if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  }
  if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  }
  if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  }
  if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");
  }
  return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
}
