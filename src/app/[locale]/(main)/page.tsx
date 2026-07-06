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
    <div className="flex flex-col space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-background border-b border-muted/30">
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -left-[10%] h-[80%] w-[60%] rounded-full bg-primary/12 blur-[120px] dark:bg-primary/5" />
          <div className="absolute -bottom-[30%] -right-[10%] h-[70%] w-[50%] rounded-full bg-secondary/15 blur-[100px] dark:bg-secondary/5" />
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 h-[50%] w-[40%] rounded-full bg-accent/8 blur-[120px] dark:bg-accent/5" />
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-xs font-semibold text-primary mb-6">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                {t("site.tagline")}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-2xl">
                {t("home.hero.titleBefore")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-extrabold">
                  {t("home.hero.titleHighlighted")}
                </span>{" "}
                {t("home.hero.titleAfter")}
              </h1>
              
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
                {t("home.hero.description")}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/10 w-full sm:w-auto group" asChild>
                  <Link href="/articles">
                    {t("home.cta.browseItems")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted w-full sm:w-auto" asChild>
                  <Link href="/inscription">{t("home.cta.createShop")}</Link>
                </Button>
              </div>
            </div>

            {/* Showcase Floating Area */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] w-full flex items-center justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000 delay-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-primary/8 rounded-full blur-[80px] pointer-events-none" />

              {/* Showcase Card 1 */}
              <div className="absolute top-4 left-4 sm:left-12 w-[180px] sm:w-[220px] rounded-2xl border bg-card/75 backdrop-blur-md p-4 shadow-xl hover:rotate-0 hover:scale-105 transition-all duration-500 hover:z-30 hover:border-primary/50 group/showcase1 animate-float-card-1">
                <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden relative">
                  <img src="https://picsum.photos/id/250/300/300" alt="Retro game" className="object-cover w-full h-full group-hover/showcase1:scale-110 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Retro</span>
                </div>
                <h4 className="font-semibold text-sm truncate">Chrono Trigger</h4>
                <p className="text-xs text-muted-foreground mt-0.5">SNES - US Version</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <span className="text-sm font-bold text-primary">$180.00</span>
                </div>
              </div>

              {/* Showcase Card 2 */}
              <div className="absolute bottom-4 right-4 sm:right-6 w-[200px] sm:w-[240px] rounded-2xl border bg-card/85 backdrop-blur-md p-4 shadow-2xl hover:rotate-0 hover:scale-105 transition-all duration-500 hover:z-30 hover:border-primary/50 group/showcase2 animate-float-card-2">
                <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden relative">
                  <img src="https://picsum.photos/id/646/300/300" alt="Robot toy" className="object-cover w-full h-full group-hover/showcase2:scale-110 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Figurine</span>
                </div>
                <h4 className="font-semibold text-sm truncate">Retro Robot 1989</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Collector Grade A+</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <span className="text-sm font-bold text-primary">$120.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
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
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{t("home.sections.popularCategories")}</h2>
            <Button variant="ghost" className="hover:bg-muted" asChild>
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
                className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-xs text-center transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-1 duration-300"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <Tag className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className="font-semibold text-sm group-hover:text-primary transition-colors block truncate">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Items Section */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{t("home.sections.latestItems")}</h2>
          <Button variant="ghost" className="hover:bg-muted" asChild>
            <Link href="/articles">
              {t("home.sections.viewAllItems")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ItemGrid items={items} />
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden rounded-3xl mx-4 sm:mx-8 shadow-xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-accent opacity-95" />
        <div className="absolute -top-[50%] -left-[20%] h-[200%] w-[60%] rounded-full bg-white/8 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[50%] -right-[20%] h-[200%] w-[60%] rounded-full bg-black/15 blur-[100px] pointer-events-none" />
        <div className="container relative z-10 text-center px-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("home.sections.sellCta.heading")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            {t("home.sections.sellCta.description")}
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-md shadow-black/10" asChild>
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
