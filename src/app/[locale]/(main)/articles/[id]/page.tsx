import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PriceDisplay } from "@/components/shared";
import { ItemStatusBadge } from "@/components/items";
import { itemsApi } from "@/lib/api/items";
import { shopsApi } from "@/lib/api/shops";
import { categoriesApi } from "@/lib/api/categories";
import { formatDate } from "@/lib/utils/date";
import { extractId } from "@/lib/utils/iri";
import { ArrowLeft, Package, Store, Tag } from "lucide-react";
import { ARTICLE_DETAIL_PAGE } from "./constants";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: Readonly<ArticlePageProps>): Promise<Metadata> {
  const { id } = await params;
  try {
    const item = await itemsApi.get(Number.parseInt(id, 10));
    return {
      title: item.name,
      description: item.description.substring(0, 160),
    };
  } catch {
    return {
      title: ARTICLE_DETAIL_PAGE.metadata.notFoundTitle,
    };
  }
}

export default async function ArticlePage({ params }: Readonly<ArticlePageProps>) {
  const { id } = await params;
  const itemId = Number.parseInt(id, 10);

  let item;
  try {
    item = await itemsApi.get(itemId);
  } catch {
    notFound();
  }

  // Fetch related data
  const shopId = extractId(item.shop);
  const categoryId = extractId(item.category);

  const [shop, category] = await Promise.all([
    shopsApi.get(shopId),
    categoriesApi.get(categoryId),
  ]);

  return (
    <div className="container py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Link */}
      <Link
        href={ARTICLE_DETAIL_PAGE.backLink.href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        {ARTICLE_DETAIL_PAGE.backLink.text}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Item Image */}
          <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center overflow-hidden border shadow-xs relative group/image">
            <img 
              src={`https://picsum.photos/id/${(itemId * 7) % 1000}/1000/1000`} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-[1.02]"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Description */}
          <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-2xl shadow-xs">
            <CardContent className="pt-6">
              <h2 className="font-bold text-lg mb-4 text-foreground">{ARTICLE_DETAIL_PAGE.description.heading}</h2>
              <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Item Info Card */}
          <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-2xl shadow-xs">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{item.name}</h1>
                <ItemStatusBadge status={item.status} />
              </div>

              <PriceDisplay
                cents={item.price}
                className="text-3xl font-extrabold text-primary tracking-tight"
              />

              <Separator className="bg-border/60" />

              {/* Category */}
              <div className="flex items-center gap-2.5 text-sm">
                <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                  <Tag className="h-4 w-4" />
                </div>
                <span className="text-muted-foreground">{ARTICLE_DETAIL_PAGE.sidebar.categoryLabel}:</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {category.name}
                </Link>
              </div>

              {/* Date */}
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <span>{ARTICLE_DETAIL_PAGE.sidebar.publishedLabel}</span>
                <span className="font-medium">{formatDate(item.createdAt)}</span>
              </div>

              {item.status === "VALIDATED" && (
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/10" size="lg">
                  {ARTICLE_DETAIL_PAGE.contact.button}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Shop Card */}
          <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-2xl shadow-xs group/shop">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 group-hover/shop:bg-primary/10 transition-colors duration-300">
                  <Store className="h-5.5 w-5.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover/shop:text-primary transition-colors duration-300">
                    {shop.name}
                  </h3>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold border-primary/20 text-primary mt-1">
                    {ARTICLE_DETAIL_PAGE.sidebar.shopLabel}
                  </Badge>
                </div>
              </div>
              {shop.description && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {shop.description}
                </p>
              )}
              <Button variant="outline" className="w-full border-border hover:bg-muted font-semibold" asChild>
                <Link href={`/boutiques/${shopId}`}>Voir la boutique</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
