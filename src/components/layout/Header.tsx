import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { mainNavItems } from "@/config/navigation";
import { Package2, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
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
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/connexion">Connexion</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/inscription">
              <User className="h-4 w-4 mr-2" />
              Inscription
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
