"use client";

import { BookOpen } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarDataType } from "@/app/problems/layout";
import Link from "next/link";

export function NavLists({
  data,
  selectedList,
  setSelectedList,
}: {
  data: SidebarDataType;
  selectedList: string;
  setSelectedList: (list: string) => void;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Lists</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item) => {
          return (
            <SidebarMenuItem
              key={item.name}
              onClick={() => setSelectedList(item.name)}
            >
              <SidebarMenuButton asChild>
                <Link href={`#`}>
                  <BookOpen />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}

        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
