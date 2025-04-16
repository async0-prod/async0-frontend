"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Searchbar from "./Searchbar";

export function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="sticky top-0 w-full h-16 flex items-center justify-between gap-4 px-4 md:px-6 z-10 ">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-16 hidden md:block" />
          <Skeleton className="h-4 w-16 hidden md:block" />
          <Skeleton className="h-4 w-16 hidden md:block" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48 hidden sm:block" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="flex h-16 items-center justify-around px-6">
        <Link href="/" className={`flex items-center font-semibold `}>
          async0
        </Link>

        <nav className="hidden md:flex md:gap-6 md:mx-auto">
          <Link href="/dashboard" className={cn("text-sm ")}>
            Dashboard
          </Link>
          <Link href="/problems" className={cn("text-sm ")}>
            Problems
          </Link>
          <Link href="/quirks" className={cn("text-sm ")}>
            Quirks
          </Link>
          <Link href="/blog" className={cn("text-sm ")}>
            Blog
          </Link>
        </nav>

        <div className="w-full lg:w-[450px] lg:ml-auto">
          <Searchbar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Toggle
            aria-label="Toggle"
            className="cursor-pointer hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent"
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

          {status === "loading" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={session.user!.image!} alt="pfp" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={() => signIn()}
            >
              <LogIn size="16" className="hidden md:block mr-2" />
              Sign in
            </Button>
          )}

          <Button
            className="items-center justify-center rounded-md md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={16} className="hidden md:block mr-2" />
            ) : (
              <Menu size={16} className="hidden md:block mr-2" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/problems"
              className={cn(
                "text-sm font-medium transition-colors hover:text-dark/70 dark:hover:text-light/70",
                pathname === "/problems"
                  ? "text-dark dark:text-light"
                  : "text-dark/60 dark:text-light/60"
              )}
            >
              Problems
            </Link>
            <Link
              href="/leaderboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-dark/70 dark:hover:text-light/70",
                pathname === "/leaderboard"
                  ? "text-dark dark:text-light"
                  : "text-dark/60 dark:text-light/60"
              )}
            >
              Leaderboard
            </Link>
            <Link
              href="/discuss"
              className={cn(
                "text-sm font-medium transition-colors hover:text-dark/70 dark:hover:text-light/70",
                pathname === "/discuss"
                  ? "text-dark dark:text-light"
                  : "text-dark/60 dark:text-light/60"
              )}
            >
              Discuss
            </Link>
            <Link
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors hover:text-dark/70 dark:hover:text-light/70",
                pathname === "/login"
                  ? "text-dark dark:text-light"
                  : "text-dark/60 dark:text-light/60"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
