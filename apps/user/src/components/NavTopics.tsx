"use client";

import { ChevronRight, SquareTerminal } from "lucide-react";

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

import { SidebarDataType } from "@/app/problems/layout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { Button } from "./ui/button";

export function NavTopics({
  data,
  selectedList,
}: {
  data: SidebarDataType;
  selectedList: string;
}) {
  const topics = data.filter((item) => item.name === selectedList);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{topics[0].name}</SidebarGroupLabel>
      <SidebarMenu>
        {topics[0].topic.map((topic) => {
          return (
            <Collapsible
              key={topic.name}
              asChild
              defaultOpen={false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={topic.name}>
                    <SquareTerminal />
                    <span className="truncate">{topic.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      {topic.topic_problem.map(({ problem }) => {
                        return (
                          <SidebarMenuSubButton key={problem.name} asChild>
                            <Link
                              href={`/problems/${problem.name.split(" ").join("-")}`}
                            >
                              <span>{problem.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        );
                      })}

                      <Button>View All</Button>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
