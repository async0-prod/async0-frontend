"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
  Map,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import { ComponentProps, RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavTopics } from "./NavTopics";
import { NavUser } from "./NavUser";
import { NavLists } from "./NavLists";
import { SidebarDataType } from "@/app/problems/layout";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  data: SidebarDataType | undefined;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const { open, setOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [selectedList, setSelectedList] = useState(data?.[0]?.name ?? "");

  useOnClickOutside(sidebarRef as RefObject<HTMLElement>, () => {
    if (open) setOpen(false);
  });

  if (!data) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      {...props}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      ref={sidebarRef}
    >
      <SidebarHeader>{/* <TeamSwitcher /> */}</SidebarHeader>
      <SidebarContent className="">
        <NavTopics data={data} selectedList={selectedList} />
        <NavLists
          data={data}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
    </Sidebar>
  );
}
