/**
 * i18n Configuration
 * Centralized configuration for internationalization
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
};

// Locale configuration for Intl APIs
export const localeConfig: Record<Locale, { dateLocale: string; currency: string }> = {
  fr: {
    dateLocale: "fr-FR",
    currency: "EUR",
  },
  en: {
    dateLocale: "en-GB",
    currency: "EUR",
  },
};
