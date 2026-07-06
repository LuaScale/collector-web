"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useShops } from "@/hooks/useShops";
import { extractId } from "@/lib/utils/iri";
import { Store, Package, Plus, ArrowRight, User } from "lucide-react";
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-background border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Decorative background lights */}
        <div className="absolute top-0 right-0 h-[250px] w-[250px] bg-primary/10 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[150px] w-[150px] bg-accent/5 rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {DASHBOARD_PAGE.greeting(user?.pseudo ?? DASHBOARD_PAGE.defaultUserName)}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {DASHBOARD_PAGE.subtitle}
          </p>
        </div>

        {/* Account Status Badge */}
        <div className="relative z-10 flex items-center gap-3 bg-card/65 backdrop-blur-xs border px-4 py-2.5 rounded-2xl shadow-xs">
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Compte</p>
            <Badge variant={user?.isVerified ? "default" : "secondary"} className="mt-0.5 text-xs">
              {user?.isVerified ? DASHBOARD_PAGE.stats.status.verified : DASHBOARD_PAGE.stats.status.notVerified}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border border-border/80 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {DASHBOARD_PAGE.stats.shops.label}
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="h-4.5 w-4.5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {shopsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-extrabold tracking-tight mt-1">{shops.length}</div>
            )}
            <p className="text-xs text-muted-foreground mt-2">Boutiques actives sur la marketplace</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-border/80 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {DASHBOARD_PAGE.stats.items.label}
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-accent/15 flex items-center justify-center">
              <Package className="h-4.5 w-4.5 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {shopsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-extrabold tracking-tight mt-1">{totalItems}</div>
            )}
            <p className="text-xs text-muted-foreground mt-2">Articles répertoriés au total</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-border/80 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {DASHBOARD_PAGE.stats.status.label}
            </CardTitle>
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${user?.isVerified ? "bg-primary/10 text-primary" : "bg-warning/15 text-warning-foreground"}`}>
              <Badge variant={user?.isVerified ? "default" : "secondary"} className="h-4.5 px-1.5 font-bold text-[9px] rounded-md border-none flex items-center justify-center">
                {user?.isVerified ? "OK" : "!"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold mt-1">
              {user?.isVerified ? "Vérifié & Sécurisé" : "Action requise"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {user?.isVerified
                ? DASHBOARD_PAGE.stats.status.verifiedMessage
                : DASHBOARD_PAGE.stats.status.notVerifiedMessage}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Shops */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions Card */}
        <Card className="border border-border/85 bg-card shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{DASHBOARD_PAGE.quickActions.heading}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Link 
              href={DASHBOARD_PAGE.quickActions.createShop.href}
              className="group flex items-start gap-4 p-3.5 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Plus className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {DASHBOARD_PAGE.quickActions.createShop.text}
                </p>
                <p className="text-xs text-muted-foreground">
                  Lancez une nouvelle boutique et commencez à vendre vos pièces.
                </p>
              </div>
            </Link>

            <Link 
              href={DASHBOARD_PAGE.quickActions.manageShops.href}
              className="group flex items-start gap-4 p-3.5 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Store className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {DASHBOARD_PAGE.quickActions.manageShops.text}
                </p>
                <p className="text-xs text-muted-foreground">
                  Éditez vos informations, gérez vos stocks et suivez vos ventes.
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Shops */}
        <Card className="border border-border/85 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">{DASHBOARD_PAGE.recentShops.heading}</CardTitle>
            <Button variant="ghost" size="sm" className="hover:bg-muted text-xs font-semibold" asChild>
              <Link href={DASHBOARD_PAGE.recentShops.viewAllHref}>
                {DASHBOARD_PAGE.recentShops.viewAllText}
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {shopsLoading && (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            )}
            {!shopsLoading && shops.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                {DASHBOARD_PAGE.recentShops.emptyMessage}
              </p>
            )}
            {!shopsLoading && shops.length > 0 && (
              <div className="space-y-3">
                {shops.slice(0, 3).map((shop) => (
                  <Link
                    key={shop["@id"]}
                    href={`/tableau-de-bord/boutiques/${extractId(shop["@id"])}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-muted/10 hover:bg-muted/40 hover:border-primary/25 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                        <Store className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                        {shop.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-muted-foreground/10 text-muted-foreground font-semibold px-2.5 py-0.5 rounded-full border-none">
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
