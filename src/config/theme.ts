/**
 * Centralized Theme Configuration
 * All UI colors and design tokens are defined here for easy maintenance
 */

/**
 * Brand Colors - Primary identity colors for the Collector marketplace
 * These define the visual identity of the application
 */
export const brandColors = {
  /** Primary brand color - Used for main CTAs, links, and brand elements */
  brand: {
    light: "oklch(0.55 0.2 250)", // Rich blue
    dark: "oklch(0.65 0.2 250)",  // Lighter blue for dark mode
  },
  /** Success states - Confirmations, completed actions */
  success: {
    light: "oklch(0.55 0.18 145)", // Green
    dark: "oklch(0.65 0.18 145)",
  },
  /** Warning states - Alerts, important notices */
  warning: {
    light: "oklch(0.75 0.15 85)", // Amber/Orange
    dark: "oklch(0.8 0.15 85)",
  },
  /** Info states - Informational messages */
  info: {
    light: "oklch(0.6 0.15 230)", // Light blue
    dark: "oklch(0.7 0.15 230)",
  },
} as const;

/**
 * Semantic Color Tokens - Map to CSS variables in globals.css
 * Use these for programmatic color access in JavaScript/TypeScript
 */
export const semanticColors = {
  // Core
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  
  // Interactive
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  
  // Surfaces
  card: "hsl(var(--card))",
  cardForeground: "hsl(var(--card-foreground))",
  popover: "hsl(var(--popover))",
  popoverForeground: "hsl(var(--popover-foreground))",
  
  // States
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  destructive: "hsl(var(--destructive))",
  
  // Utility
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  
  // Brand (custom additions)
  brand: "hsl(var(--brand))",
  brandForeground: "hsl(var(--brand-foreground))",
  success: "hsl(var(--success))",
  successForeground: "hsl(var(--success-foreground))",
  warning: "hsl(var(--warning))",
  warningForeground: "hsl(var(--warning-foreground))",
  info: "hsl(var(--info))",
  infoForeground: "hsl(var(--info-foreground))",
} as const;

/**
 * Chart Colors - For data visualization
 */
export const chartColors = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
} as const;

/**
 * Border Radius Tokens
 */
export const borderRadius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "3xl": "var(--radius-3xl)",
  "4xl": "var(--radius-4xl)",
} as const;

/**
 * Theme Configuration for next-themes
 */
export const themeConfig = {
  /** Available themes */
  themes: ["light", "dark", "system"] as const,
  /** Default theme on first visit */
  defaultTheme: "system" as const,
  /** Attribute used to apply theme (class for Tailwind dark mode) */
  attribute: "class" as const,
  /** Key for localStorage persistence */
  storageKey: "collector-theme",
  /** Enable system theme detection */
  enableSystem: true,
  /** Disable transitions on theme change to prevent flash */
  disableTransitionOnChange: true,
} as const;

/**
 * Theme labels for UI display (French)
 */
export const themeLabels = {
  light: "Clair",
  dark: "Sombre",
  system: "Système",
} as const;

export type Theme = (typeof themeConfig.themes)[number];
export type ThemeLabel = keyof typeof themeLabels;
