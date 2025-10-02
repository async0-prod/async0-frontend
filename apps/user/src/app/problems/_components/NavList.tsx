"use client";

import { ListCheck } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "@/lib/list";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

export function NavList({
  selectedListID,
  setSelectedListID,
}: {
  selectedListID: string | undefined;
  setSelectedListID: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const {
    data: lists,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      return getAllLists();
    },
  });

  useEffect(() => {
    if (lists?.data?.length) {
      setSelectedListID((prev) => prev || lists.data[0]!.id);
    }
  }, [lists, setSelectedListID]);

  if (isPending) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-almond">Lists</SidebarGroupLabel>
      <SidebarMenu>
        {lists.data.map((list) => (
          <SidebarMenuItem key={list.id} className="group/collapsible">
            <SidebarMenuButton
              tooltip={list.name}
              isActive={selectedListID === list.id}
              onClick={() => setSelectedListID(list.id)}
              className={cn(
                "cursor-pointer hover:bg-almond active:bg-almond data-[active=true]:bg-almond text-almond hover:text-charcoal active:text-charcoal data-[active=true]:text-charcoal"
              )}
            >
              <ListCheck />
              <p>{list.name}</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
