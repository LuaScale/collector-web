"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useShops } from "@/hooks/useShops";
import { extractId } from "@/lib/utils/iri";
import { Store, Package, Plus, ArrowRight } from "lucide-react";
import { DASHBOARD_PAGE } from "./constants";

export default function DashboardPage() {
  const { user } = useAuth();

  // Fetch user's shops
  const { data: shopsData, isLoading: shopsLoading } = useShops(
    user ? { owner: user.id } : undefined
  );

  // For now, we'll show stats from the shops data
  const shops = shopsData?.["hydra:member"] ?? [];
  const totalItems = shops.reduce((acc, shop) => acc + (shop.items?.length ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {DASHBOARD_PAGE.greeting(user?.pseudo ?? DASHBOARD_PAGE.defaultUserName)}
        </h1>
        <p className="text-muted-foreground mt-1">
          {DASHBOARD_PAGE.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{DASHBOARD_PAGE.stats.shops.label}</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {shopsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{shops.length}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{DASHBOARD_PAGE.stats.items.label}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {shopsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{totalItems}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{DASHBOARD_PAGE.stats.status.label}</CardTitle>
            <Badge variant={user?.isVerified ? "default" : "secondary"}>
              {user?.isVerified ? DASHBOARD_PAGE.stats.status.verified : DASHBOARD_PAGE.stats.status.notVerified}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {user?.isVerified
                ? DASHBOARD_PAGE.stats.status.verifiedMessage
                : DASHBOARD_PAGE.stats.status.notVerifiedMessage}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{DASHBOARD_PAGE.quickActions.heading}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href={DASHBOARD_PAGE.quickActions.createShop.href}>
                <Plus className="h-4 w-4 mr-2" />
                {DASHBOARD_PAGE.quickActions.createShop.text}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={DASHBOARD_PAGE.quickActions.manageShops.href}>
                <Store className="h-4 w-4 mr-2" />
                {DASHBOARD_PAGE.quickActions.manageShops.text}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Shops */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{DASHBOARD_PAGE.recentShops.heading}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={DASHBOARD_PAGE.recentShops.viewAllHref}>
                {DASHBOARD_PAGE.recentShops.viewAllText}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {shopsLoading && (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {!shopsLoading && shops.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                {DASHBOARD_PAGE.recentShops.emptyMessage}
              </p>
            )}
            {!shopsLoading && shops.length > 0 && (
              <div className="space-y-2">
                {shops.slice(0, 3).map((shop) => (
                  <Link
                    key={shop["@id"]}
                    href={`/tableau-de-bord/boutiques/${extractId(shop["@id"])}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{shop.name}</span>
                    </div>
                    <Badge variant="secondary">
                      {DASHBOARD_PAGE.recentShops.itemsLabel(shop.items?.length ?? 0)}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
