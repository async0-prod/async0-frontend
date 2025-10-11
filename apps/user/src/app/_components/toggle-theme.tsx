"use client";

import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Toggle
      aria-label="Toggle"
      className="hover:text-foreground dark:text-almond cursor-pointer hover:bg-transparent data-[state=on]:bg-transparent"
      onPressedChange={() =>
        theme === "light" ? setTheme("dark") : setTheme("light")
      }
    >
      {mounted ? (
        theme === "light" ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )
      ) : (
        <div className="h-4 w-4" />
      )}
    </Toggle>
  );
}
