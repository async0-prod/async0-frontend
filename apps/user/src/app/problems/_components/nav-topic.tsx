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
import { cn } from "@/lib/utils";

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
      <SidebarGroupLabel>Topics</SidebarGroupLabel>
      <SidebarMenu>
        {topics.data.map((topic) => (
          <Collapsible key={topic.name} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={{
                    children: (
                      <div className="flex flex-col">
                        <p className="text-almond dark:text-charcoal font-semibold">
                          {topic.name}
                        </p>
                      </div>
                    ),
                  }}
                  className={cn(
                    "text-charcoal dark:text-almond",
                    "hover:bg-almond-dark dark:hover:bg-almond-dark hover:text-charcoal dark:hover:text-charcoal",
                    "active:bg-almond-dark dark:active:bg-almond-dark active:text-charcoal dark:active:text-charcoal",
                    "data-[state=open]:hover:bg-almond-dark",
                    "cursor-pointer",
                  )}
                >
                  <BookOpen />
                  <span>{topic.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="border-none">
                  {topic.problems.map((problem) => (
                    <SidebarMenuSubItem key={problem.name}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          "text-muted-foreground",
                          "dark:hover:text-almond hover:bg-transparent",
                          "active:bg-almond-dark dark:active:bg-almond dark:active:text-charcoal",
                        )}
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
