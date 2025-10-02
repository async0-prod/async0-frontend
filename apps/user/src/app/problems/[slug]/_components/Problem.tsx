"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import ProblemDisplay from "./ProblemDisplay";
import { getProblemDetailsBySlug } from "@/lib/problem";
import { useMutation, useQuery } from "@tanstack/react-query";
import CodeEditor from "./CodeEditor";
import { submitCode, runCode } from "@/lib/submission";
import { toast } from "sonner";
import { useState } from "react";
import { CodeRunResult, CodeSubmitResult } from "@/lib/types";
import { getClientSideSession } from "@/lib/auth";

export default function Problem({ slug }: { slug: string }) {
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

          <ResizableHandle className="hidden md:block w-1 bg-charcoal/20  hover:bg-muted-foreground rounded-full my-6" />

          <ResizablePanel
            defaultSize={60}
            minSize={30}
            className="px-4 rounded-xl pt-2 pb-4"
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
