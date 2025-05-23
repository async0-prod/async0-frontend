"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Loader2, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";
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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="px-48 w-full font-nunito bg-transparent">
      <div className="flex h-24 items-center justify-around">
        <Link href="/" className={`flex items-center font-black text-3xl`}>
          async0
        </Link>

        <nav className="hidden md:flex md:gap-6 md:mx-auto text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/problems">Problems</Link>
          {/* <Link href="/quirks">Quirks</Link>
          <Link href="/blog">Blog</Link> */}
        </nav>

        <div className="w-full hidden lg:w-[450px] lg:ml-auto">
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
              <LogIn size="16" className="hidden md:block" />
              Sign in
            </Button>
          )}

          <Button
            size="sm"
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="flex flex-col space-y-4 text-sm items-center justify-center absolute  top-20 w-full">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/problems">Problems</Link>
          <Link href="/quirks">Quirks</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      )}
    </header>
  );
}
