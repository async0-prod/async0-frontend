"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Difficulty, TanstackProblem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Clock, LaptopMinimal, Shield, Tag, Timer } from "lucide-react";

export const columns: ColumnDef<TanstackProblem>[] = [
  {
    accessorKey: "has_solved",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground flex justify-center text-xs font-medium">
                <Clock size={13} className="mt-0.5" />
                <span className="ml-1">Status</span>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent className="dark:bg-almond">
              Problem status
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const hasSolved = row.getValue("has_solved") as boolean;
      return (
        <div className="flex justify-center">
          {hasSolved ? (
            <Check className="text-green-700" />
          ) : (
            <Timer className="text-yellow-600" />
          )}
        </div>
      );
    },
    size: 80,
  },

  // {
  //   accessorKey: "totalbookmarks",
  //   header: () => {
  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <div className="flex justify-center text-xs font-medium text-muted-foreground">
  //               <BookmarkIcon size={13} className="mt-0.5" />
  //               <span className="ml-1">Bookmarks</span>
  //             </div>
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p>Number of users who bookmarked this problem</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const totalBookmarks = row.getValue("totalbookmarks") as number;
  //     return (
  //       <div className="flex justify-center items-center gap-1.5 text-sm">
  //         <span className="tabular-nums">{totalBookmarks}</span>
  //       </div>
  //     );
  //   },
  //   size: 110,
  // },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-muted-foreground flex cursor-pointer items-center text-xs font-medium"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <LaptopMinimal size={13} className="mt-0.5" />
                <span className="ml-1">Problem</span>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent side="right">
              <p>Problem name</p>
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const hasSolved = row.getValue("has_solved") as boolean;
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "line-clamp-1 font-medium",
              hasSolved && "text-green-700",
            )}
          >
            {name}
          </span>
          {/* <ExternalLink
            size={14}
            className="text-muted-foreground  group-hover:opacity-100 transition-opacity"
          /> */}
        </div>
      );
    },
  },

  {
    accessorKey: "list_names",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground flex items-center justify-center text-xs font-medium">
                <Tag size={13} className="mt-0.5" />
                <span className="ml-1">Lists</span>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const lists = row.getValue("list_names") as string[];
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center text-xs">
                <p>{lists[0]}</p>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent>
              <div className="flex flex-col gap-1">
                {topicList.map((topic, index) => (
                  <span key={index}>{topic}</span>
                ))}
              </div>
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const lists = row.getValue(columnId) as string[];
      return lists.some((list) => list === filterValue);
    },
  },

  {
    accessorKey: "topic_names",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground flex items-center justify-center text-xs font-medium">
                <Tag size={13} className="mt-0.5" />
                <span className="ml-1">Topics</span>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent>
              <p>Topic name</p>
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const topicList = row.getValue("topic_names") as string[];
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center text-xs">
                <p>{topicList[0]}</p>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent>
              <div className="flex flex-col gap-1">
                {topicList.map((topic, index) => (
                  <span key={index}>{topic}</span>
                ))}
              </div>
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const topics = row.getValue(columnId) as string[];
      return topics.some((topic) => topic === filterValue);
    },
  },

  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="text-muted-foreground flex cursor-pointer items-center justify-center text-xs font-medium"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <Shield size={13} className="mt-0.5" />
                <span className="ml-1">Difficulty</span>
              </div>
            </TooltipTrigger>
            {/* <TooltipContent>
              <p>Easy. Medium. Hard.</p>
            </TooltipContent> */}
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as Difficulty;

      return (
        <div className="text-muted-foreground flex items-center justify-center text-xs">
          <div
            className={cn(
              "font-bold",
              difficulty === "EASY" && "text-green-700",
              difficulty === "MEDIUM" && "text-yellow-600",
              difficulty === "HARD" && "text-red-600",
            )}
          >
            {difficulty}
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const difficultyOrder = ["EASY", "MEDIUM", "HARD", "NA"];
      return (
        difficultyOrder.indexOf(a.getValue("difficulty")) -
        difficultyOrder.indexOf(b.getValue("difficulty"))
      );
    },
    size: 50,
  },

  // {
  //   accessorKey: "totaluserssolved",
  //   header: () => {
  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <div className="flex justify-center text-xs font-medium text-muted-foreground">
  //               <UserRoundCheck size={13} className="mt-0.5" />
  //               <span className="ml-1">Users Solved</span>
  //             </div>
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p>Number of users who solved this problem</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const totalUsersSolved = row.getValue("totaluserssolved") as number;
  //     return (
  //       <div className="flex justify-center items-center gap-1.5 text-sm">
  //         <span className="tabular-nums">{totalUsersSolved}</span>
  //       </div>
  //     );
  //   },
  //   size: 120,
  // },
];
