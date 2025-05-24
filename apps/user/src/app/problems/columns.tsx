"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { userProblemTableDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  BookmarkIcon,
  Clock,
  LaptopMinimal,
  Shield,
  Tag,
  UserRoundCheck,
} from "lucide-react";

export const columns: ColumnDef<userProblemTableDataType>[] = [
  {
    accessorKey: "hasSolved",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center text-xs font-medium text-muted-foreground">
                <Clock size={13} className="mt-0.5" />
                <span className="ml-1">Status</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Problem completion status</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const hasSolved = row.getValue("hasSolved") as boolean;
      return (
        <div className="flex justify-center">
          {hasSolved ? <p>solved</p> : <p>NA</p>}
        </div>
      );
    },
    size: 80,
  },

  {
    accessorKey: "totalbookmarks",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center text-xs font-medium text-muted-foreground">
                <BookmarkIcon size={13} className="mt-0.5" />
                <span className="ml-1">Bookmarks</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of users who bookmarked this problem</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const totalBookmarks = row.getValue("totalbookmarks") as number;
      return (
        <div className="flex justify-center items-center gap-1.5 text-sm">
          <span className="tabular-nums">{totalBookmarks}</span>
        </div>
      );
    },
    size: 110,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center text-xs font-medium text-muted-foreground cursor-pointer"
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
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium line-clamp-1">{name}</span>
          {/* <ExternalLink
            size={14}
            className="text-muted-foreground  group-hover:opacity-100 transition-opacity"
          /> */}
        </div>
      );
    },
  },

  {
    accessorKey: "topics",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center text-xs font-medium text-muted-foreground">
                <Tag size={13} className="mt-0.5" />
                <span className="ml-1">Topic</span>
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
      const topicList = row.getValue("topics") as string[];
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center text-xs">
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
                className="flex justify-center items-center text-xs font-medium text-muted-foreground cursor-pointer"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <Shield size={13} className="mt-0.5" />
                <span className="ml-1">Difficulty</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Easy. Medium. Hard.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;

      return (
        <div className="flex justify-center items-center text-muted-foreground text-xs">
          <div
            className={cn(
              "font-bold",
              difficulty === "Easy" &&
                "text-highlight-green hover:text-highlight-green/90",
              difficulty === "Medium" &&
                "text-highlight-yellow hover:text-highlight-yellow/90",
              difficulty === "Hard" && "text-red-400 hover:text-red-400/90"
            )}
          >
            {difficulty}
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const difficultyOrder = ["Easy", "Medium", "Hard", "NA"];
      return (
        difficultyOrder.indexOf(a.getValue("difficulty")) -
        difficultyOrder.indexOf(b.getValue("difficulty"))
      );
    },
    size: 50,
  },

  {
    accessorKey: "totaluserssolved",
    header: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center text-xs font-medium text-muted-foreground">
                <UserRoundCheck size={13} className="mt-0.5" />
                <span className="ml-1">Users Solved</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of users who solved this problem</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => {
      const totalUsersSolved = row.getValue("totaluserssolved") as number;
      return (
        <div className="flex justify-center items-center gap-1.5 text-sm">
          <span className="tabular-nums">{totalUsersSolved}</span>
        </div>
      );
    },
    size: 120,
  },
];
