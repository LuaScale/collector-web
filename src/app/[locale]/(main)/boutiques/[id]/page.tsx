import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ItemGrid } from "@/components/items";
import { Pagination } from "@/components/shared";
import { shopsApi } from "@/lib/api/shops";
import { itemsApi } from "@/lib/api/items";
import { usersApi } from "@/lib/api/users";
import { extractPaginationInfo, getCollectionMembers, getCollectionTotalItems } from "@/types/hydra";
import { extractId } from "@/lib/utils/iri";
import { ArrowLeft, Store, User, Package } from "lucide-react";
import { BOUTIQUE_DETAIL_PAGE } from "./constants";

interface BoutiquePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: BoutiquePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const shop = await shopsApi.get(Number.parseInt(id, 10));
    return {
      title: shop.name,
      description: shop.description || BOUTIQUE_DETAIL_PAGE.metadata.defaultDescription(shop.name),
    };
  } catch {
    return { title: BOUTIQUE_DETAIL_PAGE.metadata.notFoundTitle };
  }
}

export const dynamic = "force-dynamic";

export default async function BoutiquePage({
  params,
  searchParams,
}: Readonly<BoutiquePageProps>) {
  const { id } = await params;
  const queryParams = await searchParams;
  const shopId = Number.parseInt(id, 10);
  const page = queryParams.page ? Number.parseInt(queryParams.page, 10) : BOUTIQUE_DETAIL_PAGE.api.defaultPage;
  const itemsPerPage = BOUTIQUE_DETAIL_PAGE.api.itemsPerPage;

  // Fetch shop
  let shop;
  try {
    shop = await shopsApi.get(shopId);
  } catch {
    notFound();
  }

  // Fetch owner
  const ownerId = extractId(shop.owner);
  let owner;
  try {
    owner = await usersApi.get(ownerId);
  } catch {
    owner = null;
  }

  // Fetch shop items
  let itemsResponse;
  try {
    itemsResponse = await itemsApi.list({
      page,
      itemsPerPage,
      shop: shopId,
      status: BOUTIQUE_DETAIL_PAGE.api.status,
      "order[createdAt]": BOUTIQUE_DETAIL_PAGE.api.order,
    });
  } catch {
    itemsResponse = null;
  }

  const pagination = itemsResponse
    ? extractPaginationInfo(itemsResponse, itemsPerPage)
    : null;

  return (
    <div className="container py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Link */}
      <Link
        href={BOUTIQUE_DETAIL_PAGE.backLink.href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        {BOUTIQUE_DETAIL_PAGE.backLink.text}
      </Link>

      {/* Shop Header Banner */}
      <Card className="relative overflow-hidden border border-border/80 bg-card/40 backdrop-blur-xs rounded-3xl p-6 sm:p-8 mb-8 shadow-xs">
        {/* Background decorative mesh gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/8 via-transparent to-background opacity-90" />
        <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
          {/* Shop Logo Squircle */}
          <div className="h-20 w-20 rounded-2xl bg-card border border-border/80 shadow-md flex items-center justify-center shrink-0">
            <Store className="h-10 w-10 text-primary" />
          </div>

          {/* Shop Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{shop.name}</h1>
                {owner && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{BOUTIQUE_DETAIL_PAGE.shopInfo.ownerLabel} <span className="font-semibold text-foreground">{owner.pseudo}</span></span>
                    {owner.isVerified && (
                      <Badge variant="default" className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border-none">
                        Vérifié
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              <Badge variant="secondary" className="gap-1 bg-muted-foreground/10 text-muted-foreground font-semibold border-none rounded-full px-3 py-1">
                <Package className="h-3.5 w-3.5" />
                {itemsResponse
                  ? BOUTIQUE_DETAIL_PAGE.shopInfo.itemsLabel(getCollectionTotalItems(itemsResponse))
                  : "..."}
              </Badge>
            </div>

            {shop.description && (
              <>
                <Separator className="my-4 bg-border/60" />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">{shop.description}</p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Shop Items */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Articles en vente</h2>

        {itemsResponse ? (
          <>
            <ItemGrid
              items={getCollectionMembers(itemsResponse)}
              emptyMessage={BOUTIQUE_DETAIL_PAGE.emptyMessage}
            />

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination pagination={pagination} />
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">
            Impossible de charger les articles. Veuillez réessayer plus tard.
          </p>
        )}
      </div>
    </div>
  );
}
