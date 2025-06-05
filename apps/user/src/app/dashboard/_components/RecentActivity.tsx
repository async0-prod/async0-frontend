"use client";

import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: "1",
    problemName: "Two Sum",
    difficulty: "Easy",
    status: "Accepted",
    timestamp: "2 hours ago",
    testcases: "15/15",
  },
  {
    id: "2",
    problemName: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "Rejected",
    timestamp: "5 hours ago",
    testcases: "12/15",
  },
  {
    id: "3",
    problemName: "Merge Two Sorted Lists",
    difficulty: "Easy",
    status: "Accepted",
    timestamp: "Yesterday",
    testcases: "10/10",
  },
  {
    id: "4",
    problemName: "Maximum Subarray",
    difficulty: "Medium",
    status: "TimeLimit",
    timestamp: "2 days ago",
    testcases: "8/10",
  },
  {
    id: "5",
    problemName: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    status: "Accepted",
    timestamp: "3 days ago",
    testcases: "20/20",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium ">{activity.problemName}</h4>
              <Badge
              // variant={
              //   activity.difficulty === "Easy"
              //     ? "success"
              //     : activity.difficulty === "Medium"
              //       ? "warning"
              //       : "destructive"
              // }
              >
                {activity.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {activity.status === "Accepted" ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : activity.status === "Rejected" ? (
                  <XCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <Clock className="h-4 w-4 text-warning" />
                )}
                <span>{activity.status}</span>
              </div>
              <div>
                <span>{activity.testcases} test cases</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {activity.timestamp}
          </div>
        </div>
      ))}
    </div>
  );
}
