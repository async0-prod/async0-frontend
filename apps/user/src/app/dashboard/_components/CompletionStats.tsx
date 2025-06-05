"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

const data = [
  {
    name: "Top 100 Interview Questions",
    solved: 78,
    total: 100,
    percentage: 78,
  },
  {
    name: "Dynamic Programming",
    solved: 45,
    total: 75,
    percentage: 60,
  },
  {
    name: "Graph Algorithms",
    solved: 32,
    total: 50,
    percentage: 64,
  },
  {
    name: "Binary Trees",
    solved: 28,
    total: 40,
    percentage: 70,
  },
  {
    name: "System Design",
    solved: 15,
    total: 30,
    percentage: 50,
  },
  {
    name: "Recursion",
    solved: 22,
    total: 25,
    percentage: 88,
  },
];

export function CompletionStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      {mounted && (
        <ChartContainer
          config={{
            percentage: {
              label: "Completion %",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="hsl(var(--muted))"
                opacity={0.5}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={150}
                stroke="hsl(var(--foreground))"
              />
              <Bar
                dataKey="percentage"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                maxBarSize={30}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.percentage > 75
                        ? "hsl(var(--success))"
                        : entry.percentage > 50
                          ? "hsl(var(--warning))"
                          : "hsl(var(--destructive))"
                    }
                  />
                ))}
              </Bar>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = data[payload[0]?.payload.index];
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className=" text-sm font-bold">{item?.name}</p>
                        <p className="font-nunito text-sm text-primary">
                          <span className="font-bold">
                            {item?.solved}/{item?.total}
                          </span>{" "}
                          ({item?.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}

      <div className="space-y-4">
        {data.map((list) => (
          <div key={list.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium ">{list.name}</span>
              <span className="text-sm text-muted-foreground">
                {list.solved}/{list.total} ({list.percentage}%)
              </span>
            </div>
            <Progress
              value={list.percentage}
              className="h-2"
              style={
                {
                  "--progress-background":
                    list.percentage > 75
                      ? "hsl(var(--success))"
                      : list.percentage > 50
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
