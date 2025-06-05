"use client";

import { BookMarked } from "lucide-react";

import { Badge } from "@/components/ui/badge";

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
          <div className="space-y-1 w-full">
            <div className="flex items-center gap-2">
              <h4 className="font-medium  text-wrap max-w-[300px]">
                {problem.name}
              </h4>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="px-2 py-0 text-xs">
                {problem.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <BookMarked size={16} />
                <span>{problem.bookmarks}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
