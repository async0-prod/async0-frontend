"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState, useTransition } from "react";
import ProblemsTable from "./ProblemsTable";
import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "@/lib/list";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import ListCards from "./ListCards";

export default function ProblemUI() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedList, setSelectedList] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [selectedProblem, setSelectedProblem] = useState<string>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    data: lists,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: getAllLists,
  });

  const handleRowClick = useCallback(
    (slug: string, name: string) => {
      setSelectedProblem(name);
      startTransition(() => {
        router.push(`/problems/${slug}`);
      });
    },
    [router]
  );

  if (!hasMounted || isListLoading) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="animate-spin flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (isListError || !lists) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p>Something went wrong...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col ml-8 md:ml-16 mr-4 md:mr-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-12 flex-1 min-h-0"
      >
        <ListCards
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />

        {lists?.data && lists.data.length > 0 && (
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
                selectedListID={lists?.data[selectedList]?.id}
                handleRowClick={handleRowClick}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
