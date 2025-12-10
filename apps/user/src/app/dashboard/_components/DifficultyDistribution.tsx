"use client";

import { useState, useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

const data = [
  { name: "Easy", value: 120, color: "hsl(var(--success))" },
  { name: "Medium", value: 95, color: "hsl(var(--warning))" },
  { name: "Hard", value: 32, color: "hsl(var(--destructive))" },
];

export function DifficultyDistribution() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ChartContainer
      config={{
        value: {
          label: "Problems",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="border-border bg-background rounded-lg border p-2 shadow-md">
                    <p className="text-sm font-bold">{payload[0]?.name}</p>
                    <p className="font-nunito text-primary text-sm">
                      <span className="font-bold">{payload[0]?.value}</span>{" "}
                      problems
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
