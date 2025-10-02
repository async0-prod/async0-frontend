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
      className="cursor-pointer  hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent"
      onPressedChange={() =>
        theme === "light" ? setTheme("dark") : setTheme("light")
      }
    >
      {mounted ? (
        theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <div className="h-4 w-4" />
      )}
    </Toggle>
  );
}
