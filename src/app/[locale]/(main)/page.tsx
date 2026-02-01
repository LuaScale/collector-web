import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ItemGrid } from "@/components/items";
import { itemsApi } from "@/lib/api/items";
import { categoriesApi } from "@/lib/api/categories";
import { ArrowRight, Package2, Store, Tag } from "lucide-react";
import { Item } from "@/types/entities/item";
import { Category } from "@/types/entities/category";
import { getCollectionMembers } from "@/types/hydra";
import { HOMEPAGE } from "./constants";

export const dynamic = "force-dynamic";

async function getItems(): Promise<Item[]> {
  try {
    const response = await itemsApi.list({
      status: HOMEPAGE.api.status,
      itemsPerPage: HOMEPAGE.api.itemsPerPage,
      "order[createdAt]": HOMEPAGE.api.order.items,
    });
    return getCollectionMembers(response);
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await categoriesApi.list({
      itemsPerPage: HOMEPAGE.api.categoriesPerPage,
    });
    return getCollectionMembers(response);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const t = await getTranslations();
  const [items, categories] = await Promise.all([
    getItems(),
    getCategories(),
  ]);

  const features = [
    {
      key: "uniqueItems",
      icon: Package2,
    },
    {
      key: "verifiedShops",
      icon: Store,
    },
    {
      key: "transparentPricing",
      icon: Tag,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t("home.hero.titleBefore")}{" "}
              <span className="text-primary">{t("home.hero.titleHighlighted")}</span> {t("home.hero.titleAfter")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.hero.description")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/articles">
                  {t("home.cta.browseItems")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/inscription">{t("home.cta.createShop")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.key} className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t(`home.features.${feature.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`home.features.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{t("home.sections.popularCategories")}</h2>
              <Button variant="ghost" asChild>
                <Link href="/categories">
                  {t("home.sections.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category["@id"]}
                  href={`/categories/${category.slug}`}
                  className="group p-6 rounded-lg border bg-card text-center transition-all hover:shadow-md hover:border-primary"
                >
                  <Tag className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Items Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{t("home.sections.latestItems")}</h2>
            <Button variant="ghost" asChild>
              <Link href="/articles">
                {t("home.sections.viewAllItems")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ItemGrid items={items} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("home.sections.sellCta.heading")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            {t("home.sections.sellCta.description")}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/inscription">
              {t("home.cta.startNow")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
