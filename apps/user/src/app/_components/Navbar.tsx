"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon, Loader2, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "../../components/ui/toggle";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="px-4 lg:px-24 h-16 font-nunito flex items-center justify-around">
      <Link href="/" className={`font-black text-xl`}>
        async0
      </Link>

      <div className="flex items-center gap-2 ml-auto">
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
            className="cursor-pointer mr-2"
            onClick={() => signIn()}
          >
            <LogIn size="16" />
            Sign in
          </Button>
        )}

        {/* <div className="md:hidden flex items-center">
          <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
            <DropdownMenuTrigger className="cursor-pointer">
              {isOpen ? <X /> : <Menu />}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={20}
              className="bg-charcoal dark:bg-almond text-almond dark:text-charcoal"
            >
              <DropdownMenuItem>
                <Link href="/problems">Problems</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </header>
  );
}
