"use client";

import Link from "next/link";
import { LogIn, LogOut, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getClientSideSession } from "@/lib/auth";
import { env } from "next-runtime-env";

export default function UserAuth() {
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-almond-dark h-8 w-8 animate-pulse rounded-full" />
        <div className="bg-almond-dark hidden h-4 w-20 animate-pulse rounded md:block" />
      </div>
    );
  }

  if (!session || isError) {
    return (
      <Link
        href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/google/login`}
        className="flex items-center space-x-2"
      >
        <Button
          size="sm"
          className="bg-primary text-almond hover:bg-primary hover:text-secondary dark:bg-almond dark:hover:bg-almond dark:text-charcoal cursor-pointer"
        >
          <LogIn size="16" />
          <p>Sign In</p>
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-almond flex cursor-pointer items-center md:space-x-3">
            {session.data.image ? (
              <Avatar>
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback className="bg-charcoal dark:bg-almond"></AvatarFallback>
              </Avatar>
            ) : (
              <div className="bg-almond-dark flex h-8 w-8 items-center justify-center rounded-full">
                <User className="text-muted-foreground h-4 w-4" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          className="bg-almond dark:bg-charcoal dark:text-almond border-almond-dark/50 mr-4 md:mr-8"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback className="bg-charcoal text-almond dark:bg-almond dark:text-charcoal rounded-lg"></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.data.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {session.data.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/google/logout`}
              className="focus:bg-almond-dark dark:focus:bg-almond dark:focus:text-charcoal cursor-pointer"
            >
              <LogOut className="hover:text-charcoal" />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
