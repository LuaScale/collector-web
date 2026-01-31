"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { LoadingPage } from "@/components/shared";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { DASHBOARD_LAYOUT } from "./constants";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(DASHBOARD_LAYOUT.routes.login);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingPage message={DASHBOARD_LAYOUT.loadingMessage} />;
  }

  if (!isAuthenticated) {
    return <LoadingPage message={DASHBOARD_LAYOUT.redirectMessage} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center gap-4 border-b px-4 h-14">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{DASHBOARD_LAYOUT.mobileMenu.ariaLabel}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
          <span className="font-semibold">{DASHBOARD_LAYOUT.mobileMenu.title}</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
