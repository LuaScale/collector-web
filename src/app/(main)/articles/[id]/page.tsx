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
    <div className="container py-8">
      {/* Back Link */}
      <Link
        href={ARTICLE_DETAIL_PAGE.backLink.href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {ARTICLE_DETAIL_PAGE.backLink.text}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Placeholder */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Package className="h-24 w-24 text-muted-foreground" />
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold mb-4">{ARTICLE_DETAIL_PAGE.description.heading}</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Item Info Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <ItemStatusBadge status={item.status} />
              </div>

              <PriceDisplay
                cents={item.price}
                className="text-3xl font-bold text-primary"
              />

              <Separator />

              {/* Category */}
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{ARTICLE_DETAIL_PAGE.sidebar.categoryLabel}:</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="font-medium hover:text-primary"
                >
                  {category.name}
                </Link>
              </div>

              {/* Date */}
              <div className="text-sm text-muted-foreground">
                {ARTICLE_DETAIL_PAGE.sidebar.publishedLabel} {formatDate(item.createdAt)}
              </div>

              {item.status === "VALIDATED" && (
                <Button className="w-full" size="lg">
                  {ARTICLE_DETAIL_PAGE.contact.button}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Shop Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Store className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{shop.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {ARTICLE_DETAIL_PAGE.sidebar.shopLabel}
                  </Badge>
                </div>
              </div>
              {shop.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {shop.description}
                </p>
              )}
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/boutiques/${shopId}`}>Voir la boutique</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
