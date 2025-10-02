"use client";

import { getTestcasesByProblemID } from "@/lib/testcase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeSubmitResult, Problem, Testcase } from "@/lib/types";
import { cn, formatDifficulty, unescapeCode } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Bookmark,
  Check,
  Flame,
  Hourglass,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function ProblemInfoCard({
  problem,
  isProblemLoading,
  isErrorProblem,
  problemSubmitResult,
}: {
  problem?: Problem;
  isProblemLoading: boolean;
  isErrorProblem: boolean;
  problemSubmitResult: CodeSubmitResult | null;
}) {
  const {
    data: testcases,
    isLoading: isLoadingTestcases,
    isError: isErrorTestcases,
  } = useQuery({
    queryKey: ["testcase", problem?.id],
    queryFn: () => getTestcasesByProblemID(problem!.id),
    enabled: !!problem,
  });

  if (isProblemLoading) {
    return (
      <Card className="bg-transparent border-charcoal/20 dark:border-almond/20 border-none shadow-none gap-4 p-4">
        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="p-0 mt-4 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />

          <Skeleton className="h-3 w-32" />

          <div className="space-y-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="px-4 py-4 text-sm bg-transparent border-charcoal/20"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isErrorProblem || !problem) {
    return (
      <Card className="bg-transparent border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond border-none shadow-none gap-4 p-4">
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>Failed to load problem. Please try again.</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond border-none shadow-none gap-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start ">
          <div>
            <CardTitle className="text-2xl font-semibold text-wrap">
              {problem?.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-6 sm:gap-4 text-xs text-center">
              <div className="flex items-center gap-1 justify-center text-xs rounded-full ">
                <Flame
                  size={13}
                  className="text-charcoal/60 dark:text-almond/60 mb-0.5"
                />
                <span>{formatDifficulty(problem?.difficulty)}</span>
              </div>
            </CardDescription>
          </div>
          <Bookmark size={20} className="mt-2 cursor-pointer" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mb-4 flex flex-col gap-2">
          <Balancer>{problem.description}</Balancer>
          <Link
            href={problem?.link ?? "#"}
            target="#"
            className="text-xs hover:underline text-charcoal/60  w-fit"
          >
            View problem on neetcode
          </Link>
        </div>

        {isLoadingTestcases && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="px-4 py-4 text-sm bg-transparent border-charcoal/20"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {isErrorTestcases && (
          <div className="flex items-center gap-2 text-red-600 text-sm my-4">
            <AlertCircle size={16} />
            <span>Failed to load testcases. Please try again.</span>
          </div>
        )}

        {testcases?.data.map((testcase, i) => {
          return (
            <motion.div
              key={testcase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <TestCaseBlock
                testcase={testcase}
                problemSubmitResult={problemSubmitResult}
                index={i}
              />
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function TestCaseBlock({
  testcase,
  problemSubmitResult,
  index,
}: {
  testcase: Testcase;
  problemSubmitResult: CodeSubmitResult | null;
  index: number;
}) {
  return (
    <Card
      className={cn(
        "p-4 mb-6 text-sm text-muted-foreground overflow-x-auto text-nowrap bg-transparent border-charcoal/20 dark:border-almond/20",
        problemSubmitResult?.data.overall_status === "AC" && "border-green-700",
        problemSubmitResult?.data.overall_status === "WA" &&
          "border-yellow-300",
        problemSubmitResult?.data.overall_status === "RE" && "border-red-600"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          problemSubmitResult?.data.overall_status === "AC" && "text-green-700",
          problemSubmitResult?.data.overall_status === "WA" &&
            "text-yellow-300",
          problemSubmitResult?.data.overall_status === "RE" && "text-red-600"
        )}
      >
        <p>Testcase - {index + 1}</p>
        <div className="ml-auto">
          {problemSubmitResult?.data.overall_status === "AC" && (
            <Check className="h-4 w-4" />
          )}
          {problemSubmitResult?.data.overall_status === "WA" && (
            <Hourglass className="h-4 w-4" />
          )}
          {problemSubmitResult?.data.overall_status === "RE" && (
            <X className="h-4 w-4" />
          )}
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-between",
          problemSubmitResult?.data.overall_status === "AC" && "text-green-700",
          problemSubmitResult?.data.overall_status === "WA" &&
            "text-yellow-300",
          problemSubmitResult?.data.overall_status === "RE" && "text-red-600"
        )}
      >
        <pre className="overflow-x-auto">
          <code>{`${unescapeCode(testcase.ui)}`}</code>
        </pre>
        <pre className="overflow-x-auto">
          {`Output: ${unescapeCode(testcase.output)}`}
        </pre>
      </div>
    </Card>
  );
}
