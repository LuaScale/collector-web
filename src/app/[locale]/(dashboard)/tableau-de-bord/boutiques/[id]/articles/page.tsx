"use client";

import { use } from "react";
import Link from "next/link";
import { SHOP_ARTICLES_PAGE } from "./constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EmptyState } from "@/components/shared";
import { ItemStatusBadge } from "@/components/items/ItemStatusBadge";
import { useShop } from "@/hooks/useShops";
import { useItems, useDeleteItem } from "@/hooks/useItems";
import { extractId } from "@/lib/utils/iri";
import { formatPrice } from "@/lib/utils/price";
import { toast } from "sonner";
import { ArrowLeft, Plus, Package, Pencil, Trash2, Eye } from "lucide-react";

interface ArticlesPageProps {
  params: Promise<{ id: string }>;
}

export default function ArticlesPage({ params }: Readonly<ArticlesPageProps>) {
  const { id } = use(params);
  const shopId = Number.parseInt(id, 10);
  const { data: shop, isLoading: shopLoading } = useShop(shopId);
  const { data: itemsData, isLoading: itemsLoading } = useItems({ shop: shopId });
  const deleteItem = useDeleteItem();

  const items = itemsData?.["hydra:member"] ?? [];
  const isLoading = shopLoading || itemsLoading;

  const handleDelete = async (itemId: number, itemName: string) => {
    try {
      await deleteItem.mutateAsync(itemId);
      toast.success(SHOP_ARTICLES_PAGE.messages.deleteSuccess(itemName));
    } catch {
      toast.error(SHOP_ARTICLES_PAGE.messages.deleteError);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href={SHOP_ARTICLES_PAGE.backLink.href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {SHOP_ARTICLES_PAGE.backLink.text}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {shopLoading ? (
                <Skeleton className="h-9 w-64 inline-block" />
              ) : (
                SHOP_ARTICLES_PAGE.heading(shop?.name ?? "la boutique")
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              {SHOP_ARTICLES_PAGE.subtitle}
            </p>
          </div>
          <Button asChild>
            <Link href={SHOP_ARTICLES_PAGE.routes.newArticle(shopId)}>
              <Plus className="h-4 w-4 mr-2" />
              {SHOP_ARTICLES_PAGE.buttons.addArticle}
            </Link>
          </Button>
        </div>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Liste des articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          )}
          {!isLoading && items.length === 0 && (
            <EmptyState
              title={SHOP_ARTICLES_PAGE.emptyState.title}
              description={SHOP_ARTICLES_PAGE.emptyState.description}
              icon={<Package className="h-12 w-12" />}
              action={
                <Button asChild>
                  <Link href={SHOP_ARTICLES_PAGE.routes.newArticle(shopId)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {SHOP_ARTICLES_PAGE.emptyState.actionText}
                  </Link>
                </Button>
              }
            />
          )}
          {!isLoading && items.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{SHOP_ARTICLES_PAGE.table.headers.title}</TableHead>
                  <TableHead>{SHOP_ARTICLES_PAGE.table.headers.price}</TableHead>
                  <TableHead>{SHOP_ARTICLES_PAGE.table.headers.status}</TableHead>
                  <TableHead className="text-right">{SHOP_ARTICLES_PAGE.table.headers.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const itemId = extractId(item["@id"]);

                  return (
                    <TableRow key={item["@id"]}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{formatPrice(item.price)}</TableCell>
                      <TableCell>
                        <ItemStatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={SHOP_ARTICLES_PAGE.routes.editArticle(shopId, itemId)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/articles/${itemId}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {SHOP_ARTICLES_PAGE.deleteDialog.title}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {SHOP_ARTICLES_PAGE.deleteDialog.description(item.name)}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{SHOP_ARTICLES_PAGE.deleteDialog.cancel}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(itemId, item.name)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {SHOP_ARTICLES_PAGE.deleteDialog.confirm}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
