"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import ProblemDisplay from "./problem-display";
import { getProblemDetailsBySlug } from "@/lib/problem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CodeEditor from "./code-editor";
import { submitCode, runCode } from "@/lib/submission";
import { toast } from "sonner";
import { useState } from "react";
import { CodeRunResult, CodeSubmitResult } from "@/lib/types";
import { getClientSideSession } from "@/lib/auth";

export default function Problem({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const {
    data: problem,
    isLoading: isLoadingProblem,
    isError: isErrorProblem,
  } = useQuery({
    queryKey: ["problem", slug],
    queryFn: () => getProblemDetailsBySlug(slug),
    retry: 1,
  });

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => getClientSideSession(),
  });

  const { mutate: submit, isPending: isSubmitPending } = useMutation({
    mutationFn: async (code: string) => {
      if (!problem) return;
      return await submitCode(code, problem.data.id);
    },

    onSuccess: (data) => {
      if (data) {
        setProblemSubmitResult(data);
        queryClient.invalidateQueries({
          queryKey: ["submissions", problem?.data.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["problem", slug],
        });
        queryClient.invalidateQueries({
          queryKey: ["analytics"],
        });
      } else {
        toast.error("Failed to submit code");
      }
    },
  });

  const { mutate: run, isPending: isRunPending } = useMutation({
    mutationFn: async (code: string) => {
      if (!problem) return;
      return await runCode(code);
    },
    onSuccess: (data) => {
      if (data) {
        setProblemRunResult(data);
      } else {
        toast.error("Failed to submit code");
      }
    },
  });

  const [problemRunResult, setProblemRunResult] =
    useState<CodeRunResult | null>(null);
  const [problemSubmitResult, setProblemSubmitResult] =
    useState<CodeSubmitResult | null>(null);
  const [consoleMode, setConsoleMode] = useState<"run" | "submit" | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  function handleRun(userCode: string) {
    if (!session) {
      toast.error("You need to login first");
      return;
    }

    if (!problem) {
      toast.error("No problem found");
      return;
    }

    if (!isConsoleOpen) setIsConsoleOpen(true);
    clearConsole();
    setConsoleMode("run");
    run(userCode);
  }

  function handleSubmit(userCode: string) {
    if (!session) {
      toast.error("You need to login first");
      return;
    }

    if (!problem) {
      toast.error("No problem found");
      return;
    }

    if (!isConsoleOpen) setIsConsoleOpen(true);
    clearConsole();
    setConsoleMode("submit");
    submit(userCode);
  }

  function clearConsole() {
    setProblemRunResult(null);
    setProblemSubmitResult(null);
    setConsoleMode(null);
  }

  function toggleConsole() {
    setIsConsoleOpen(!isConsoleOpen);
  }

  return (
    <>
      <div className="lg:hidden">
        <ProblemDisplay
          problem={problem?.data}
          isLoadingProblem={isLoadingProblem}
          isErrorProblem={isErrorProblem}
          problemSubmitResult={problemSubmitResult}
        />
      </div>
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={30} className="rounded-xl">
            <ProblemDisplay
              problem={problem?.data}
              isLoadingProblem={isLoadingProblem}
              isErrorProblem={isErrorProblem}
              problemSubmitResult={problemSubmitResult}
            />
          </ResizablePanel>

          <ResizableHandle className="bg-charcoal/20 hover:bg-muted-foreground my-6 hidden w-1 rounded-full md:block" />

          <ResizablePanel
            defaultSize={60}
            minSize={30}
            className="rounded-xl px-4 pt-2 pb-4"
          >
            {problem?.data && (
              <CodeEditor
                problem={problem.data}
                handleRun={handleRun}
                handleSubmit={handleSubmit}
                clearConsole={clearConsole}
                problemRunResult={problemRunResult}
                problemSubmitResult={problemSubmitResult}
                isRunPending={isRunPending}
                isSubmitPending={isSubmitPending}
                consoleMode={consoleMode}
                isConsoleOpen={isConsoleOpen}
                toggleConsole={toggleConsole}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
