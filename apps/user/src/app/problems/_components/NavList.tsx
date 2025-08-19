"use client";

import {
  Folder,
  Forward,
  ListCheck,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "@/app/fetch/list";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavList({
  setSelectedListID,
}: {
  setSelectedListID: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { isMobile } = useSidebar();
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
      <SidebarGroupLabel>Lists</SidebarGroupLabel>
      <SidebarMenu>
        {lists.data.map((list, index) => (
          <SidebarMenuItem key={list.id} className="group/collapsible">
            <SidebarMenuButton
              tooltip={list.name}
              isActive={index === 0}
              onClick={() => setSelectedListID(list.id)}
              className="cursor-pointer"
            >
              <ListCheck />
              <span>{list.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
