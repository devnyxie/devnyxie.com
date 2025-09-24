"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/button";

const themes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    name: "system",
    label: "System",
    icon: Monitor,
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="flex items-center gap-1">
        <div className="size-9 rounded-md animate-pulse bg-muted/30" />
        <div className="size-9 rounded-md animate-pulse bg-muted/30" />
        <div className="size-9 rounded-md animate-pulse bg-muted/30" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.name;

        return (
          <Button
            key={themeOption.name}
            variant="ghost"
            size="icon"
            onClick={() => setTheme(themeOption.name)}
            className={
              isActive
                ? "bg-input/25 text-foreground border border-border"
                : "text-muted-foreground"
            }
            title={`Switch to ${themeOption.label.toLowerCase()} theme${
              theme === themeOption.name ? " (current)" : ""
            }`}
            aria-label={`Switch to ${themeOption.label.toLowerCase()} theme${
              theme === themeOption.name ? " (current)" : ""
            }`}
            aria-pressed={isActive}
          >
            <Icon size={16} />
          </Button>
        );
      })}
    </div>
  );
}
