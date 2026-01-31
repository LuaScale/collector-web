import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Package2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}. Trouvez des pièces rares et uniques pour
              votre collection.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/articles" className="hover:text-foreground transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/boutiques" className="hover:text-foreground transition-colors">
                  Boutiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-3">Compte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/connexion" className="hover:text-foreground transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-foreground transition-colors">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/tableau-de-bord" className="hover:text-foreground transition-colors">
                  Tableau de bord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
