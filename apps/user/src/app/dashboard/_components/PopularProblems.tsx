"use client";

import { BookMarked, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const problems = [
  {
    id: "1",
    name: "Two Sum",
    difficulty: "Easy",
    bookmarks: 1245,
    upvotes: 982,
  },
  {
    id: "2",
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    bookmarks: 987,
    upvotes: 876,
  },
  {
    id: "3",
    name: "Merge Two Sorted Lists",
    difficulty: "Easy",
    bookmarks: 876,
    upvotes: 765,
  },
  {
    id: "4",
    name: "Maximum Subarray",
    difficulty: "Medium",
    bookmarks: 765,
    upvotes: 654,
  },
  {
    id: "5",
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    bookmarks: 654,
    upvotes: 543,
  },
];

export function PopularProblems() {
  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <div
          key={problem.id}
          className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium font-manrope">{problem.name}</h4>
              <Badge
              // variant={
              //   problem.difficulty === "Easy"
              //     ? "success"
              //     : problem.difficulty === "Medium"
              //       ? "warning"
              //       : "destructive"
              // }
              >
                {problem.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookMarked className="h-4 w-4" />
                <span>{problem.bookmarks}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{problem.upvotes}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Solve
          </Button>
        </div>
      ))}
    </div>
  );
}
