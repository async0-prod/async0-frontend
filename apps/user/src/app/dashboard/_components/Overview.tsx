"use client";

import { useState, useEffect, useRef } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const timePeriodsData = {
  "1d": [
    { date: "12 AM", problems: 0 },
    { date: "4 AM", problems: 0 },
    { date: "8 AM", problems: 2 },
    { date: "12 PM", problems: 5 },
    { date: "4 PM", problems: 3 },
    { date: "8 PM", problems: 4 },
    { date: "11 PM", problems: 1 },
  ],
  "7d": [
    { date: "Monday", problems: 7 },
    { date: "Tuesday", problems: 12 },
    { date: "Wednesday", problems: 9 },
    { date: "Thursday", problems: 6 },
    { date: "Friday", problems: 8 },
    { date: "Saturday", problems: 14 },
    { date: "Sunday", problems: 10 },
  ],
  "1m": [
    { date: "Week 1", problems: 35 },
    { date: "Week 2", problems: 42 },
    { date: "Week 3", problems: 28 },
    { date: "Week 4", problems: 39 },
  ],
  all: [
    { date: "Jan", problems: 120 },
    { date: "Feb", problems: 145 },
    { date: "Mar", problems: 132 },
    { date: "Apr", problems: 98 },
    { date: "May", problems: 110 },
    { date: "Jun", problems: 125 },
    { date: "Jul", problems: 140 },
    { date: "Aug", problems: 160 },
    { date: "Sep", problems: 155 },
    { date: "Oct", problems: 170 },
    { date: "Nov", problems: 185 },
    { date: "Dec", problems: 190 },
  ],
};

type TimePeriod = "1d" | "7d" | "1m" | "all";

export function Overview() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix for chart rendering issues on first render
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = timePeriodsData[timePeriod];

  const periodLabels = {
    "1d": "Last 24 Hours",
    "7d": "Last 7 Days",
    "1m": "Last Month",
    all: "All Time",
  };

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          Showing data for:{" "}
          <span className="font-bold">{periodLabels[timePeriod]}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timePeriod === "1d" ? "default" : "outline"}
            onClick={() => setTimePeriod("1d")}
          >
            1D
          </Button>
          <Button
            size="sm"
            variant={timePeriod === "7d" ? "default" : "outline"}
            onClick={() => setTimePeriod("7d")}
          >
            7D
          </Button>
          <Button
            size="sm"
            variant={timePeriod === "1m" ? "default" : "outline"}
            onClick={() => setTimePeriod("1m")}
          >
            1M
          </Button>
          <Button
            size="sm"
            variant={timePeriod === "all" ? "default" : "outline"}
            onClick={() => setTimePeriod("all")}
          >
            All
          </Button>
        </div>
      </div>

      {mounted && (
        <ChartContainer
          config={{
            problems: {
              label: "Problems Solved",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--muted))"
                opacity={0.5}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="hsl(var(--foreground))"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="hsl(var(--foreground))"
                tick={{ fill: "hsl(var(--foreground))" }}
                domain={[0, "auto"]}
                padding={{ top: 20 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className=" text-sm font-bold">
                          {payload[0]?.payload.date}
                        </p>
                        <p className="font-nunito text-sm text-primary">
                          <span className="font-bold">{payload[0]?.value}</span>{" "}
                          problems solved
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="problems"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{
                  fill: "hsl(var(--primary))",
                  r: 6,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  );
}
