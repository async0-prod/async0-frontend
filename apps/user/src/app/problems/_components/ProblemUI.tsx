"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { motion } from "motion/react";
import { useEffect, useState, useTransition } from "react";
import BreadCrumbs from "@/components/Breadcrumbs";
import ProblemsTable from "./ProblemsTable";
import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "@/app/fetch/list";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProblemUI() {
  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: getAllLists,
  });

  const router = useRouter();
  const [selectedList, setSelectedList] = useState<string | undefined>(
    undefined
  );
  const [isPending, startTransition] = useTransition();
  const [selectedProblem, setSelectedProblem] = useState<string>();

  useEffect(() => {
    if (lists?.data?.[0]?.id && !selectedList) {
      setSelectedList(lists.data[0].id);
    }
  }, [lists?.data, selectedList]);

  if (isListLoading)
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="animate-spin flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  if (isListError)
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="animate-spin flex items-center justify-center">
          <p>Something went wrong...</p>
        </div>
      </div>
    );

  function handleRowClick(slug: string, name: string) {
    setSelectedProblem(name);
    startTransition(() => {
      router.push(`/problems/${slug}`);
    });
  }

  return (
    <main className="flex-1 flex flex-col min-h-dvh ml-8 md:ml-16 mr-4 md:mr-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-12 flex-1 min-h-0"
      >
        <div className="hidden lg:block">
          <BreadCrumbs />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lists?.data.map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedList(list.id)}
            >
              <Card
                className={`h-full transition-all duration-300 hover:shadow-xl ${
                  selectedList === list.id
                    ? "ring-2 ring-[#262424] shadow-lg"
                    : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {list.name}
                    </CardTitle>
                    {selectedList === list.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-[#262424] rounded-full"
                      />
                    )}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedList && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-h-0"
          >
            {isPending ? (
              <div className="h-full w-full flex items-center justify-center">
                <Loader className="animate-spin" />
                <p className="text-center text-sm text-muted-foreground">
                  {`  Loading ${selectedProblem}...`}
                </p>
              </div>
            ) : (
              <ProblemsTable
                selectedListID={selectedList}
                handleRowClick={handleRowClick}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
