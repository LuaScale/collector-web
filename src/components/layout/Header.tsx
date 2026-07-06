"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  Package2,
  User,
  LayoutDashboard,
  Store,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const t = useTranslations();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/articles", label: t("nav.items") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/boutiques", label: t("nav.shops") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-xs"
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6 group">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Package2 className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <ThemeToggle />

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 rounded-full pl-2 pr-3 flex items-center gap-2 hover:bg-muted/60 transition-colors"
                >
                  <Avatar className="h-7 w-7 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      {user.pseudo.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium max-w-[100px] truncate hidden sm:inline-block">
                    {user.pseudo}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-1" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {user.pseudo}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/tableau-de-bord"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{t("nav.dashboard")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/tableau-de-bord/boutiques"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{t("nav.myShops")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/tableau-de-bord/profil"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{t("nav.myProfile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/tableau-de-bord/parametres"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{t("nav.settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("auth.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-muted"
              >
                <Link href="/connexion">{t("auth.login")}</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/inscription">
                  <User className="h-4 w-4 mr-2" />
                  {t("auth.register")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
