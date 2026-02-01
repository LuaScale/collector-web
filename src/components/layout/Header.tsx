"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Package2, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations();

  const navItems = [
    { href: "/articles", label: t("nav.items") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/boutiques", label: t("nav.shops") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/connexion">{t("auth.login")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/inscription">
              <User className="h-4 w-4 mr-2" />
              {t("auth.register")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
