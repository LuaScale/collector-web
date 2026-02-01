"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Package2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.items")}
            </Link>
            <Link href="/boutiques" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.shops")}
            </Link>
          </nav>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. {t("common.allRightsReserved")}
        </div>
      </footer>
    </div>
  );
}
