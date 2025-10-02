"use client";

import { getCardAnalytics } from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { List } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, Pie, Cell, PieChart } from "recharts";

interface ListCardsProps {
  lists: { data: List[] };
  selectedList: number;
  setSelectedList: (index: number) => void;
}

export default function ListCards({
  lists,
  selectedList,
  setSelectedList,
}: ListCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {lists?.data?.map((list, index) => (
        <ListCard
          key={list.id}
          list={list}
          index={index}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      ))}
    </div>
  );
}

function ListCard({
  list,
  index,
  selectedList,
  setSelectedList,
}: {
  list: List;
  index: number;
  selectedList: number;
  setSelectedList: (index: number) => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics", list.id],
    queryFn: () => getCardAnalytics(list.id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <motion.div
        key={list.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="cursor-pointer"
      >
        <Card className="h-full bg-almond dark:bg-charcoal border-almond-darker">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center justify-between mt-4 gap-8">
              <Skeleton className="h-40 w-1/2 rounded-full" />
              <div className="space-y-3 grow">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        key={list.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="cursor-pointer"
      >
        <Card className="h-full bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-800">
          <div className="p-6 flex flex-col items-center justify-center text-center text-red-600 dark:text-red-300">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="font-semibold">Failed to load analytics</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={list.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={() => setSelectedList(index)}
    >
      <Card
        className={`h-full transition-all duration-300 hover:shadow-xl bg-almond-lighter border-almond-dark/30  text-charcoal dark:text-almond ${
          selectedList === index && "shadow-lg dark:border-almond-dark"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-charcoal dark:text-almond mb-2">
            {list.name}
          </h1>
          <p className="text-muted-foreground text-sm mb-4">
            {`${data?.data.total_questions} questions • ${data?.data.total_solutions} solutions • ${data?.data.total_user_attempts} attempts`}
          </p>

          <div className="flex items-center justify-between mt-4 gap-8">
            <div className="relative w-1/2 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: "progress", value: 100 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={60}
                    startAngle={0}
                    endAngle={-360}
                    dataKey="value"
                    fill="none"
                  >
                    <Cell fill="1e1b18" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="font-bold">
                  {data?.data.total_solved}
                </motion.span>
                <span className="text-xs">/{data?.data.total_questions}</span>
                <span className="text-xs">Solved</span>
              </div>
            </div>

            <div className="space-y-3 grow">
              <div className="flex items-center justify-between">
                <span className="text-sm text-teal-600">Easy</span>
                <span className="text-sm">
                  <motion.span>{data?.data.total_easy_solved}</motion.span>/
                  {data?.data.total_easy_q}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600">Medium</span>
                <span className="text-sm text-muted-foreground">
                  <motion.span>{data?.data.total_medium_solved}</motion.span>/
                  {data?.data.total_medium_q}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600">Hard</span>
                <span className="text-sm text-muted-foreground">
                  <motion.span>{data?.data.total_hard_solved}</motion.span>/
                  {data?.data.total_hard_q}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
