"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 fixed bottom-0 right-0 p-4">
      <Switch
        id="dark-mode"
        checked={theme === "light"}
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className={className}
      />
      <Label htmlFor="dark-mode">{theme} Mode</Label>
    </div>
  );
}
