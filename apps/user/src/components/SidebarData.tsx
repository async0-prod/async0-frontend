"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { List, BookOpen, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, RefObject } from "react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet, SheetTitle } from "./ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarDataType } from "@/lib/types";
import { Progress } from "./ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { useOnClickOutside, useToggle } from "usehooks-ts";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SidebarProps = {
  data: SidebarDataType;
};

export function SidebarData({ data }: SidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDesktopSidebarOpen, toggleDesktopSidebarOpen] = useToggle(false);
  const [selectedList, setSelectedList] = useState<string>(
    data.length > 0 ? (data[0]?.name ?? "") : ""
  );
  const [showAllTopics, setShowAllTopics] = useState(false);

  useOnClickOutside(ref as RefObject<HTMLElement>, (e) => {
    e.stopImmediatePropagation();
    if (!isDesktopSidebarOpen) return;
    toggleDesktopSidebarOpen();
  });

  const INITIAL_TOPICS_COUNT = 3;

  const currentList = data.find((list) => list.name === selectedList);

  const collapsedSidebarContent = (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full flex-col items-center py-8">
        {/* Section 1: User Profile Icon */}
        <div className="mb-8 flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage src={`${session?.user?.image}`} />
                <AvatarFallback>
                  {session?.user?.name?.substring(0, 2).toUpperCase() ?? "NA"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{session?.user?.name}</p>
              {/* <p className="text-xs text-almond/60">90% complete</p> */}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Section 2: Lists Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mb-4 text-almond hover:bg-transparent hover:text-almond"
            >
              <List className="h-5 w-5" />
              <span className="sr-only">Problem Lists</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-almond">
            Problem Lists
          </TooltipContent>
        </Tooltip>

        {/* Section 3: Problems Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mb-4 text-almond hover:bg-transparent hover:text-almond"
            >
              <BookOpen className="h-5 w-5" />
              <span className="sr-only">Problems</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-almond">
            Problems
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );

  const expandedSidebarContent = (
    <div className="flex h-full flex-col py-4 font-nunito">
      {/* Section 1: User Profile */}
      {session && session.user && (
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`${session?.user?.image}`} />
              <AvatarFallback>
                {session?.user?.name?.substring(0, 2).toUpperCase() ?? "NA"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{session?.user?.name}</span>
              <span className="text-xs text-almond/60">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Course Progress</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </div>
      )}

      {/* Section 2: Lists */}
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-almond/60">Lists</h3>
        <div className="flex flex-col gap-1">
          {data.map((list) => (
            <Button
              key={list.name}
              variant={selectedList === list.name ? "default" : "ghost"}
              className={cn(
                "justify-start hover:bg-almond hover:text-charcoal",
                selectedList === list.name && "bg-almond text-charcoal",
                "cursor-pointer"
              )}
              size={"sm"}
              onClick={() => setSelectedList(list.name)}
            >
              {list.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Section 3: Topics and Problems */}
      <div className="flex-1 overflow-auto p-4 mb-40">
        <h3 className="mb-2 text-sm font-medium text-almond/60">Topics</h3>
        {currentList?.topic && currentList.topic.length > 0 ? (
          <Accordion type="multiple">
            {currentList.topic
              ?.slice(
                0,
                showAllTopics ? currentList.topic.length : INITIAL_TOPICS_COUNT
              )
              .map((topic) => (
                <AccordionItem key={topic.name} value={topic.name}>
                  <AccordionTrigger className="text-sm cursor-pointer pl-2">
                    {topic.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1 w-full">
                      {topic.topic_problem.map((tp) => {
                        const problem = tp.problem;
                        // const isSolved = user.solvedProblems.includes(
                        //   problem.name
                        // );

                        return (
                          <div
                            key={problem.name}
                            className="flex items-center justify-between rounded-md px-4 py-2 group cursor-pointer hover:text-almond/50"
                            onClick={() => {
                              router.push(
                                `/problems/${problem.name.split(" ").join("-")}`
                              );
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "flex size-4 items-center justify-center rounded-full border border-almond mb-0.5"
                                  // isSolved
                                  //   ? "bg-primary border-primary"
                                  //   : "border-muted-foreground"
                                )}
                              >
                                {/* {isSolved && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )} */}
                              </div>
                              <span className="text-sm text-wrap">
                                {problem.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

            {currentList.topic?.length > INITIAL_TOPICS_COUNT && (
              <div className="mt-2 flex justify-center">
                {!showAllTopics ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTopics(true)}
                    className="flex items-center gap-1 text-xs hover:bg-transparent hover:text-almond cursor-pointer"
                  >
                    Show More ({currentList.topic.length - INITIAL_TOPICS_COUNT}
                    )
                    <ChevronDown />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTopics(false)}
                    className="flex items-center gap-1 text-xs hover:bg-transparent hover:text-almond cursor-pointer"
                  >
                    Show Less
                    <ChevronUp />
                  </Button>
                )}
              </div>
            )}
          </Accordion>
        ) : (
          <div className=" border-almond/60 text-center text-sm">
            No topics found. (Soon to be added)
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 right-4 bg-transparent border-none hover:bg-transparent dark:hover:bg-transparent dark:bg-transparent cursor-pointer shadow-none dark:text-almond
              "
            >
              <Menu size={16} />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-charcoal text-almond">
            <SheetTitle className="w-full flex items-center justify-center mt-4">
              <Link href="/" className={`font-bold text-2xl text-almond`}>
                async0
              </Link>
            </SheetTitle>
            {expandedSidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* collapsed sidebar content */}
      <aside
        ref={ref}
        onClick={() => {
          if (isDesktopSidebarOpen) return;
          toggleDesktopSidebarOpen();
        }}
        className={cn(
          "sticky h-screen top-0  bg-charcoal text-white",
          "hidden lg:block",
          isDesktopSidebarOpen ? "min-w-[280px]" : "min-w-[78px]"
        )}
      >
        {isDesktopSidebarOpen
          ? expandedSidebarContent
          : collapsedSidebarContent}
      </aside>
    </>
  );
}
