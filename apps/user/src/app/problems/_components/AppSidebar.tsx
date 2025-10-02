"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavList } from "./NavList";
import { NavTopic } from "./NavTopic";
import { ComponentProps, RefObject, useRef, useState } from "react";
import { NavInfo } from "./NavInfo";
import { useOnClickOutside } from "usehooks-ts";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [selectedListID, setSelectedListID] = useState<string | undefined>(
    undefined
  );
  const { open, openMobile, toggleSidebar } = useSidebar();
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref as RefObject<HTMLElement>, (e) => {
    e.stopImmediatePropagation();
    if (!open && !openMobile) return;
    toggleSidebar();
  });

  return (
    <Sidebar
      collapsible="icon"
      aria-label="Main navigation"
      ref={ref}
      onClick={() => {
        if (open || openMobile) return;
        toggleSidebar();
      }}
      className="border-none mt-4"
      {...props}
    >
      <SidebarHeader className="bg-charcoal">
        <NavInfo />
      </SidebarHeader>
      <SidebarContent className="bg-charcoal">
        <NavList
          selectedListID={selectedListID}
          setSelectedListID={setSelectedListID}
        />
        <NavTopic selectedListID={selectedListID} />
      </SidebarContent>
    </Sidebar>
  );
}
