"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getClientSideSession } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { LogIn, LogOut, User } from "lucide-react";
import { env } from "next-runtime-env";
import Link from "next/link";

export default function AdminDashboard() {
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
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="hidden md:block w-20 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!session || isError) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Link
          href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin/google/login`}
          className="flex items-center space-x-2"
        >
          <Button
            size="sm"
            className="cursor-pointer bg-primary text-secondary hover:bg-primary hover:text-secondary"
          >
            <LogIn size="16" />
            <p>Sign In</p>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center md:space-x-3 cursor-pointer text-secondary">
            {session.data.image ? (
              <Avatar>
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          className="mr-4 md:mr-8 bg-almond dark:bg-charcoal dark:text-almond"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm ">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
              href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin/google/logout`}
              className="cursor-pointer focus:bg-almond-darker  dark:focus:bg-almond dark:focus:text-charcoal"
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
