"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Progress } from "@/components/ui/progress";

const topics = [
  {
    name: "Arrays",
    solved: 45,
    total: 50,
    percentage: 90,
    color: "hsl(var(--success))",
  },
  {
    name: "Strings",
    solved: 38,
    total: 45,
    percentage: 84,
    color: "hsl(var(--success))",
  },
  {
    name: "Dynamic Programming",
    solved: 25,
    total: 40,
    percentage: 63,
    color: "hsl(var(--warning))",
  },
  {
    name: "Trees",
    solved: 30,
    total: 35,
    percentage: 86,
    color: "hsl(var(--success))",
  },
  {
    name: "Graphs",
    solved: 18,
    total: 30,
    percentage: 60,
    color: "hsl(var(--warning))",
  },
  {
    name: "Greedy",
    solved: 12,
    total: 20,
    percentage: 60,
    color: "hsl(var(--warning))",
  },
  {
    name: "Backtracking",
    solved: 8,
    total: 15,
    percentage: 53,
    color: "hsl(var(--warning))",
  },
  {
    name: "Sorting",
    solved: 10,
    total: 10,
    percentage: 100,
    color: "hsl(var(--success))",
  },
];

export function TopicProgress({ showAll = false }: { showAll?: boolean }) {
  const displayTopics = showAll ? topics : topics.slice(0, 5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      {!showAll && mounted && (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="solved"
              >
                {topics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="space-y-4">
        {displayTopics.map((topic) => (
          <div key={topic.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium ">{topic.name}</span>
              <span className="text-sm text-muted-foreground">
                {topic.solved}/{topic.total} ({topic.percentage}%)
              </span>
            </div>
            <Progress
              value={topic.percentage}
              className="h-2"
              style={
                {
                  "--progress-background":
                    topic.percentage > 75
                      ? "hsl(var(--success))"
                      : topic.percentage > 50
                        ? "hsl(var(--warning))"
                        : "hsl(var(--destructive))",
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
