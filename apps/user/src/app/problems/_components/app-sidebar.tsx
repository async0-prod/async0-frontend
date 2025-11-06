"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavList } from "./nav-list";
import { NavTopic } from "./nav-topic";
import { ComponentProps, RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [isClient, setIsClient] = useState(false);
  const [selectedListID, setSelectedListID] = useState<string | undefined>(
    undefined,
  );
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const { open, openMobile, toggleSidebar, isMobile } = useSidebar();
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref as RefObject<HTMLElement>, (e) => {
    // if (dropdownOpen) {
    //   return;
    // }

    if ((e.target as HTMLElement).closest("[data-dropdown-menu]")) {
      return;
    }

    if (!open && !openMobile) return;
    toggleSidebar();
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      aria-label="Main navigation"
      ref={ref}
      onClick={() => {
        if (open || openMobile) return;
        toggleSidebar();
      }}
      {...props}
    >
      <div
        className={cn(
          "dark:hover:shadow-almond relative h-full overflow-hidden rounded-md transition-shadow hover:shadow-xl dark:hover:shadow-xs",
          !isMobile && "my-6",
          !open && "cursor-pointer",
        )}
      >
        <div className="h-full w-full">
          <SidebarContent>
            <NavList
              selectedListID={selectedListID}
              setSelectedListID={setSelectedListID}
            />
            <NavTopic selectedListID={selectedListID} />
          </SidebarContent>
        </div>
      </div>
    </Sidebar>
  );
}
