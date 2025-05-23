"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

export default function NavigationPane() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="flex items-center justify-center gap-4 mx-auto">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/problems">Problems</Link>
        {/* <Link href="/quirks">Quirks</Link>
        <Link href="/blog">Blog</Link> */}
      </div>

      <Toggle
        aria-label="Toggle"
        className="ml-auto cursor-pointer hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent"
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
    </div>
  );
}
