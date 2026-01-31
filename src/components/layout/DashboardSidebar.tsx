"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import {
  LayoutDashboard,
  Store,
  Settings,
  Package2,
  LogOut,
  ChevronLeft,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/tableau-de-bord",
    icon: LayoutDashboard,
  },
  {
    title: "Mes boutiques",
    href: "/tableau-de-bord/boutiques",
    icon: Store,
  },
  {
    title: "Mon profil",
    href: "/tableau-de-bord/profil",
    icon: User,
  },
  {
    title: "Paramètres",
    href: "/tableau-de-bord/parametres",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/tableau-de-bord" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User section */}
      <div className="p-4 space-y-4">
        {user && (
          <div className="px-3 py-2">
            <p className="text-sm font-medium">{user.pseudo}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        )}

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour au site
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  );
}
