"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themeLabels, type Theme } from "@/config/theme";

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
        <span className="sr-only">Changer le thème</span>
      </Button>
    );
  }

  // Get current icon based on resolved theme (actual displayed theme)
  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Changer le thème">
          <CurrentIcon className="h-5 w-5 transition-transform" />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(themeLabels) as Theme[]).map((themeKey) => {
          const Icon = themeIcons[themeKey];
          const isActive = theme === themeKey;
          
          return (
            <DropdownMenuItem
              key={themeKey}
              onClick={() => setTheme(themeKey)}
              className={isActive ? "bg-accent" : ""}
            >
              <Icon className="h-4 w-4 mr-2" />
              {themeLabels[themeKey]}
              {isActive && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
