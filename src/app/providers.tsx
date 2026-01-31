"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { themeConfig } from "@/config/theme";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute={themeConfig.attribute}
      defaultTheme={themeConfig.defaultTheme}
      enableSystem={themeConfig.enableSystem}
      disableTransitionOnChange={themeConfig.disableTransitionOnChange}
      storageKey={themeConfig.storageKey}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
