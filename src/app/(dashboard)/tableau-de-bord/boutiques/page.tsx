"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useAuth } from "@/hooks/useAuth";
import { useShops, useDeleteShop } from "@/hooks/useShops";
import { extractId } from "@/lib/utils/iri";
import { toast } from "sonner";
import { Store, Plus, Package, Pencil, Trash2, Eye } from "lucide-react";
import { DASHBOARD_BOUTIQUES_PAGE } from "./constants";

export default function BoutiquesPage() {
  const { user } = useAuth();
  const { data, isLoading } = useShops(user ? { owner: user.id } : undefined);
  const deleteShop = useDeleteShop();

  const shops = data?.["hydra:member"] ?? [];

  const handleDelete = async (shopId: number, shopName: string) => {
    try {
      await deleteShop.mutateAsync(shopId);
      toast.success(DASHBOARD_BOUTIQUES_PAGE.messages.deleteSuccess(shopName));
    } catch {
      toast.error(DASHBOARD_BOUTIQUES_PAGE.messages.deleteError);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{DASHBOARD_BOUTIQUES_PAGE.heading}</h1>
          <p className="text-muted-foreground mt-1">
            {DASHBOARD_BOUTIQUES_PAGE.subtitle}
          </p>
        </div>
        <Button asChild>
          <Link href={DASHBOARD_BOUTIQUES_PAGE.buttons.newShopHref}>
            <Plus className="h-4 w-4 mr-2" />
            {DASHBOARD_BOUTIQUES_PAGE.buttons.newShop}
          </Link>
        </Button>
      </div>

      {/* Shops List */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {!isLoading && shops.length === 0 && (
        <EmptyState
          title={DASHBOARD_BOUTIQUES_PAGE.emptyState.title}
          description={DASHBOARD_BOUTIQUES_PAGE.emptyState.description}
          icon={<Store className="h-12 w-12" />}
          action={
            <Button asChild>
              <Link href={DASHBOARD_BOUTIQUES_PAGE.buttons.newShopHref}>
                <Plus className="h-4 w-4 mr-2" />
                {DASHBOARD_BOUTIQUES_PAGE.emptyState.actionText}
              </Link>
            </Button>
          }
        />
      )}
      {!isLoading && shops.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => {
            const shopId = extractId(shop["@id"]);
            const itemCount = shop.items?.length ?? 0;

            return (
              <Card key={shop["@id"]}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{shop.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Package className="h-3 w-3" />
                      {itemCount}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shop.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {shop.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={DASHBOARD_BOUTIQUES_PAGE.routes.editShop(shopId)}>
                        <Pencil className="h-3 w-3 mr-1" />
                        {DASHBOARD_BOUTIQUES_PAGE.buttons.edit}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={DASHBOARD_BOUTIQUES_PAGE.routes.shopArticles(shopId)}>
                        <Package className="h-3 w-3 mr-1" />
                        {DASHBOARD_BOUTIQUES_PAGE.buttons.articles}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={DASHBOARD_BOUTIQUES_PAGE.routes.viewShop(shopId)} target="_blank">
                        <Eye className="h-3 w-3 mr-1" />
                        {DASHBOARD_BOUTIQUES_PAGE.buttons.view}
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{DASHBOARD_BOUTIQUES_PAGE.deleteDialog.title}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {DASHBOARD_BOUTIQUES_PAGE.deleteDialog.description(shop.name)}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{DASHBOARD_BOUTIQUES_PAGE.deleteDialog.cancel}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(shopId, shop.name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {DASHBOARD_BOUTIQUES_PAGE.deleteDialog.confirm}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
