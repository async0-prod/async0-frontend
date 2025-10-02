"use client";

import { BookOpen, ChevronRight } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getSidebarTopicsByListID } from "@/lib/topic";
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
      <SidebarGroupLabel className="text-almond">Topics</SidebarGroupLabel>
      <SidebarMenu className="text-almond">
        {topics.data.map((topic) => (
          <Collapsible key={topic.name} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={topic.name}
                  className="cursor-pointer hover:bg-almond data-[state=open]:hover:bg-almond active:bg-almond hover:text-charcoal data-[state=open]:hover:text-charcoal active:text-charcoal"
                >
                  <BookOpen />
                  <span>{topic.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="border-almond">
                  {topic.problems.map((problem) => (
                    <SidebarMenuSubItem key={problem.name}>
                      <SidebarMenuSubButton
                        asChild
                        className="text-almond hover:bg-almond hover:text-charcoal"
                      >
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
