"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ size = "md", className }: Readonly<LoadingSpinnerProps>) {
  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
  );
}

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message }: Readonly<LoadingPageProps>) {
  const t = useTranslations("common");
  const displayMessage = message ?? t("loading");

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">{displayMessage}</p>
    </div>
  );
}
