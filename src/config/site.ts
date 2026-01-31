export const siteConfig = {
  name: "Collector",
  description: "La marketplace des collectionneurs passionnés",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/collector",
  },
};

export type SiteConfig = typeof siteConfig;
