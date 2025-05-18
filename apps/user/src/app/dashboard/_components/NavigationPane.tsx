"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

import { ChevronsUpDown, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";

export default function NavigationPane() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center">
      <Toggle
        aria-label="Toggle"
        className="cursor-pointer hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent"
        onPressedChange={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Toggle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant={"outline"}>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Dashboard</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg">
          <DropdownMenuItem className="gap-2 p-2" asChild>
            <Link href="/problems">Problems</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 p-2" asChild>
            <Link href="/quirks">Quirks</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 p-2" asChild>
            <Link href="/blogs">Blogs</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
