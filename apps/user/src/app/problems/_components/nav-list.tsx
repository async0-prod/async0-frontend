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
import { motion } from "motion/react";

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
      <SidebarGroupLabel>Lists</SidebarGroupLabel>
      <SidebarMenu>
        {lists.data.map((list) => (
          <SidebarMenuItem key={list.id} className="group/collapsible">
            <SidebarMenuButton
              tooltip={{
                children: (
                  <div className="flex flex-col">
                    <p className="text-almond dark:text-charcoal font-semibold">
                      {list.name}
                    </p>
                    {/* <span className="text-xs opacity-70">
                      {list.total_problems} problems
                    </span> */}
                  </div>
                ),
              }}
              isActive={selectedListID === list.id}
              onClick={() => setSelectedListID(list.id)}
              className={cn(
                "text-charcoal dark:text-almond",
                "hover:bg-almond-dark dark:hover:bg-almond-dark dark:hover:text-charcoal",
                "active:bg-almond-dark dark:active:bg-almond-dark dark:active:text-charcoal",
                "data-[active=true]:bg-almond-dark dark:data-[active=true]:bg-almond-dark dark:data-[active=true]:text-charcoal",
                "cursor-pointer",
              )}
            >
              <ListCheck />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {list.name}
              </motion.p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
