"use client";

import {
  BookOpen,
  ChevronRight,
  Dot,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getSidebarTopicsByListID } from "@/app/fetch/topic";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

export function NavTopic({
  selectedListID,
}: {
  selectedListID: string | undefined;
}) {
  const { isMobile } = useSidebar();

  const {
    data: topics,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["topics", selectedListID],
    queryFn: async () => {
      return getSidebarTopicsByListID(selectedListID!);
    },
    enabled: !!selectedListID,
  });

  if (isPending) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {topics.data.map((topic, index) => (
          <Collapsible
            key={topic.name}
            asChild
            // defaultOpen={index === 0}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={topic.name}>
                  <BookOpen />
                  <span>{topic.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {topic.problems.map((problem) => (
                    <SidebarMenuSubItem key={problem.name}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/problems/${problem.slug}`}>
                          <span>{problem.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
