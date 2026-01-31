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
    <div className="container py-8">
      {/* Back Link */}
      <Link
        href={BOUTIQUE_DETAIL_PAGE.backLink.href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {BOUTIQUE_DETAIL_PAGE.backLink.text}
      </Link>

      {/* Shop Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Shop Icon */}
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Store className="h-10 w-10 text-primary" />
            </div>

            {/* Shop Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl font-bold">{shop.name}</h1>
                  {owner && (
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{BOUTIQUE_DETAIL_PAGE.shopInfo.ownerLabel} {owner.pseudo}</span>
                      {owner.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          Vérifié
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="gap-1">
                  <Package className="h-3 w-3" />
                  {itemsResponse
                    ? BOUTIQUE_DETAIL_PAGE.shopInfo.itemsLabel(getCollectionTotalItems(itemsResponse))
                    : "..."}
                </Badge>
              </div>

              {shop.description && (
                <>
                  <Separator className="my-4" />
                  <p className="text-muted-foreground">{shop.description}</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
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
