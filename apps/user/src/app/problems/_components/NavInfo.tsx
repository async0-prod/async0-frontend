"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getClientSideSession } from "@/app/fetch/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavInfo() {
  const { isMobile } = useSidebar();
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
    retry: false,
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session && (
          <SidebarMenuButton
            size="lg"
            className="text-almond hover:bg-transparent hover:text-almond active:bg-transparent active:text-almond"
          >
            <Avatar>
              <AvatarImage src={session.data.image} alt={session.data.name} />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{session.data.name}</span>
              <span className="truncate text-xs">{session.data.email}</span>
            </div>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
