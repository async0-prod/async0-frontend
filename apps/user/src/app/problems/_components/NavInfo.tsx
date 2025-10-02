"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getClientSideSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavInfo() {
  const { data: session } = useQuery({
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
