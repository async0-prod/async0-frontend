"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

import { List, BookOpen, Settings, Plus, Minus, Menu } from "lucide-react";
import { useState, useEffect, useRef, RefObject } from "react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";
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
import { Badge } from "./ui/badge";

import { useOnClickOutside, useToggle } from "usehooks-ts";

type SidebarProps = {
  data: SidebarDataType;
  isLoading?: boolean;
};

export function SidebarData({ data, isLoading = false }: SidebarProps) {
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobileSidebarOpen, toggleMobileSidebarOpen] = useToggle(false);
  const [isDesktopSidebarOpen, toggleDesktopSidebarOpen] = useToggle(false);
  const [selectedList, setSelectedList] = useState<string>(
    data.length > 0 ? data[0].name : ""
  );
  const [isMobile, setIsMobile] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useOnClickOutside(ref as RefObject<HTMLElement>, (e) => {
    e.stopImmediatePropagation();
    if (!isDesktopSidebarOpen) return;
    toggleDesktopSidebarOpen();
  });

  const INITIAL_TOPICS_COUNT = 3;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const currentList = data.find((list) => list.name === selectedList);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const collapsedSidebarContent = (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full flex-col items-center py-4 bg-background">
        {/* Section 1: User Profile Icon */}
        <div className="mb-8 flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage src={`${session?.user?.image}`} />
                <AvatarFallback>
                  {session?.user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">90% complete</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Section 2: Lists Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-4">
              <List className="h-5 w-5" />
              <span className="sr-only">Problem Lists</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Problem Lists</TooltipContent>
        </Tooltip>

        {/* Section 3: Problems Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-4">
              <BookOpen className="h-5 w-5" />
              <span className="sr-only">Problems</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Problems</TooltipContent>
        </Tooltip>

        {/* Spacer to push settings to bottom */}
        <div className="flex-1"></div>

        {/* Section 4: Settings Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-4">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>

        {/* Expand Sidebar Button */}
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDesktopSidebarOpen}
              className="mt-2"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Expand Sidebar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Expand Sidebar</TooltipContent>
        </Tooltip> */}
      </div>
    </TooltipProvider>
  );

  const expandedSidebarContent = (
    <div className="flex h-full flex-col bg-background">
      {/* Section 1: User Profile */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`${session?.user?.image}`} />
            <AvatarFallback>
              {session?.user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground">
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

      {/* Section 2: Lists */}
      <div className="border-b p-4">
        <h3 className="mb-2 text-sm font-medium">Problem Lists</h3>
        <div className="flex flex-col gap-1">
          {data.map((list) => (
            <Button
              key={list.name}
              variant={selectedList === list.name ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setSelectedList(list.name)}
            >
              {list.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Section 3: Topics and Problems */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="mb-2 text-sm font-medium">Topics</h3>
        {currentList && (
          <Accordion type="multiple" className="w-full">
            {currentList.topic
              .slice(
                0,
                showAllTopics ? currentList.topic.length : INITIAL_TOPICS_COUNT
              )
              .map((topic) => (
                <AccordionItem key={topic.name} value={topic.name}>
                  <AccordionTrigger className="text-sm">
                    {topic.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-2">
                      {topic.topic_problem.map((tp) => {
                        const problem = tp.problem;
                        // const isSolved = user.solvedProblems.includes(
                        //   problem.name
                        // );

                        return (
                          <div
                            key={problem.name}
                            className="flex items-center justify-between rounded-md p-2 hover:bg-accent group"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "flex h-5 w-5 items-center justify-center rounded-full border"
                                  // isSolved
                                  //   ? "bg-primary border-primary"
                                  //   : "border-muted-foreground"
                                )}
                              >
                                {/* {isSolved && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )} */}
                              </div>
                              <span className="text-sm">{problem.name}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                getDifficultyColor(problem.difficulty)
                              )}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

            {currentList.topic.length > INITIAL_TOPICS_COUNT && (
              <div className="mt-2 flex justify-center">
                {!showAllTopics ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllTopics(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Show More ({currentList.topic.length -
                      INITIAL_TOPICS_COUNT}{" "}
                    more)
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllTopics(false)}
                    className="flex items-center gap-1"
                  >
                    <Minus className="h-4 w-4" />
                    Show Less
                  </Button>
                )}
              </div>
            )}
          </Accordion>
        )}
      </div>

      {/* Section 4: Settings */}
      <div className="border-t p-4 flex flex-col gap-2">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        {/* <Button
          variant="outline"
          className="w-full justify-start"
          size="sm"
          onClick={toggleDesktopSidebarOpen}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Collapse Sidebar
        </Button> */}
      </div>
    </div>
  );

  const expandedLoadingState = (
    <div className="flex h-full flex-col bg-background">
      {/* Section 1: User Profile Loading */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      </div>

      {/* Section 2: Lists Loading */}
      <div className="border-b p-4">
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>

      {/* Section 3: Topics and Problems Loading */}
      <div className="flex-1 overflow-auto p-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-32 mx-auto mt-2" />
        </div>
      </div>

      {/* Section 4: Settings Loading */}
      <div className="border-t p-4">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );

  const collapsedLoadingState = (
    <div className="flex flex-col items-center py-4 gap-6">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="flex-1"></div>
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet
          open={isMobileSidebarOpen}
          onOpenChange={toggleMobileSidebarOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-40"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            {isLoading ? expandedLoadingState : expandedSidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      {/* collapsed sidebar content */}
      <aside
        onClick={() => {
          if (isDesktopSidebarOpen) return;
          toggleDesktopSidebarOpen();
        }}
        className={cn(
          "fixed inset-y-0 z-30 w-[78px] transition-all duration-300 ease-in-out border-r",
          !isDesktopSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isDesktopSidebarOpen && "lg:hidden"
        )}
      >
        {isLoading ? collapsedLoadingState : collapsedSidebarContent}
      </aside>

      {/* expanded sidebar content  */}
      <aside
        ref={ref}
        className={cn(
          "fixed inset-y-0  z-30 w-[280px] transform transition-all duration-300 ease-in-out bg-background border-r",
          isDesktopSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          !isDesktopSidebarOpen && "lg:hidden"
        )}
      >
        {isLoading ? expandedLoadingState : expandedSidebarContent}
      </aside>
    </>
  );
}
