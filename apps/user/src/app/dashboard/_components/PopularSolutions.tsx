"use client";

import { Code, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    id: "1",
    problemName: "Two Sum",
    language: "JavaScript",
    upvotes: 1245,
    rank: 1,
  },
  {
    id: "2",
    problemName: "Longest Substring Without Repeating Characters",
    language: "Python",
    upvotes: 987,
    rank: 1,
  },
  {
    id: "3",
    problemName: "Merge Two Sorted Lists",
    language: "Java",
    upvotes: 876,
    rank: 1,
  },
  {
    id: "4",
    problemName: "Maximum Subarray",
    language: "C++",
    upvotes: 765,
    rank: 1,
  },
  {
    id: "5",
    problemName: "Median of Two Sorted Arrays",
    language: "Python",
    upvotes: 654,
    rank: 1,
  },
];

export function PopularSolutions() {
  return (
    <div className="space-y-4">
      {solutions.map((solution) => (
        <div
          key={solution.id}
          className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-1">
            <h4 className="font-medium font-manrope">{solution.problemName}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="px-2 py-0 text-xs">
                {solution.language}
              </Badge>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{solution.upvotes}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Code className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      ))}
    </div>
  );
}
