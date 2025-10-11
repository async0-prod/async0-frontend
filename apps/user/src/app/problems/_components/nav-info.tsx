"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavInfo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={{
            children: (
              <div className="flex flex-col">
                <p className="text-almond dark:text-charcoal font-semibold">
                  Go To Home Page
                </p>
              </div>
            ),
          }}
          size="lg"
          asChild
          className="hover:bg-almond-dark active:bg-almond-dark dark:hover:text-charcoal dark:active:text-charcoal"
        >
          <Link href="/">
            <div className="bg-primary dark:bg-almond dark:text-charcoal text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
              a0
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">async0</span>
              {/* <span className="truncate text-xs">Enterprise</span> */}
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
