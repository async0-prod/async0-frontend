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
import {
  CodeSubmitResult,
  Problem,
  Testcase,
  TestcaseResult,
} from "@/lib/types";
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
      <Card className="border-charcoal/20 dark:border-almond/20 gap-4 border-none bg-transparent p-4 shadow-none">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="mt-4 space-y-4 p-0">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />

          <Skeleton className="h-3 w-32" />

          <div className="mt-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="border-charcoal/20 bg-transparent px-4 py-4 text-sm"
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
      <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent p-4 shadow-none">
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>Failed to load problem. Please try again.</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
      <div className="flex items-start justify-between">
        <CardHeader className="w-full max-w-76 p-0 lg:max-w-lg">
          <CardTitle className="text-xl font-semibold text-wrap">
            {problem?.name}
          </CardTitle>
          <CardDescription className="flex items-center">
            <div className="flex items-center justify-center gap-1 rounded-full">
              <Flame
                size={13}
                className="text-charcoal/60 dark:text-almond/60 mb-0.5"
              />
              <span>{formatDifficulty(problem?.difficulty)}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <Bookmark size={20} className="my-auto cursor-pointer" />
      </div>

      <CardContent className="p-0">
        <div className="mb-4 flex flex-col gap-2">
          <Balancer>{problem.description}</Balancer>
          <Link
            href={problem?.link ?? "#"}
            target="#"
            className="text-charcoal/60 w-fit text-xs hover:underline"
          >
            View problem on neetcode
          </Link>
        </div>

        {isLoadingTestcases && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="border-charcoal/20 bg-transparent px-4 py-4 text-sm"
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
          <div className="my-4 flex items-center gap-2 text-sm text-red-600">
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
                testcaseSubmitStatus={
                  problemSubmitResult?.data?.testcases_results[i] ?? null
                }
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
  testcaseSubmitStatus,
  index,
}: {
  testcase: Testcase;
  testcaseSubmitStatus: TestcaseResult | null;
  index: number;
}) {
  return (
    <Card
      className={cn(
        "text-muted-foreground border-charcoal/20 dark:border-almond/20 mb-6 overflow-x-auto bg-transparent p-4 text-sm text-nowrap",
        testcaseSubmitStatus
          ? testcaseSubmitStatus.tc_status_id === 5
            ? "border-yellow-500"
            : testcaseSubmitStatus?.tc_pass
              ? "border-green-700"
              : "border-red-600"
          : "",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          testcaseSubmitStatus
            ? testcaseSubmitStatus.tc_status_id === 5
              ? "text-yellow-500"
              : testcaseSubmitStatus?.tc_pass
                ? "text-green-700"
                : "text-red-600"
            : "",
        )}
      >
        <p>Testcase - {index + 1}</p>
        <div className="ml-auto">
          {testcaseSubmitStatus ? (
            testcaseSubmitStatus?.tc_status_id === 5 ? (
              <Hourglass size={16} />
            ) : testcaseSubmitStatus?.tc_pass ? (
              <Check size={16} />
            ) : (
              <X size={16} />
            )
          ) : null}
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-1">
        <p>{`${unescapeCode(testcase.ui)}`}</p>
        <p>{`Output: ${unescapeCode(testcase.output)}`}</p>
      </div>
    </Card>
  );
}
