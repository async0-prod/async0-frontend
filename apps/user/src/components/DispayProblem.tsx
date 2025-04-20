"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";
import { useMobile } from "@/hooks/isMobile";
import { problemNameMapping } from "@/lib/mapping";
import CodeEditor from "./CodeEditor";
import { submissionRun, submissionSubmit } from "@/lib/submission";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { judge0ResponseType, problemType } from "@/lib/types";

export default function DispayProblem({
  problem,
}: {
  problem: problemType | null;
}) {
  const isMobile = useMobile();
  const { data: session } = useSession();
  const [problemRunStatus, setProblemRunStatus] =
    useState<judge0ResponseType | null>(null);
  const [problemSubmitStatus, setProblemSubmitStatus] = useState<
    judge0ResponseType[] | null
  >(null);
  const [isPending, startTransition] = useTransition();

  if (!problem) {
    return <div>Loading...</div>;
  }

  const ProblemComponentDetails = problemNameMapping[problem.name];

  function handleRun(value: string) {
    // if (!session) {
    //   toast.error("You need to login first");
    //   return;
    // }

    startTransition(async () => {
      const res = await submissionRun(value);
      setProblemRunStatus(res);
    });
  }

  function handleSubmit(value: string) {
    // if (!session) {
    //   toast.error("You need to login first");
    //   return;
    // }

    if (!problem) {
      toast.error("No problem found");
      return;
    }

    startTransition(async () => {
      const res = await submissionSubmit(value, problem.testcase);
      setProblemSubmitStatus(res);
    });
  }

  function clearConsole() {
    setProblemRunStatus(null);
    setProblemSubmitStatus(null);
  }

  return (
    <div className="container mx-auto flex flex-col p-4">
      {isMobile ? (
        <ProblemComponentDetails
          problem={problem}
          problemSubmitStatus={problemSubmitStatus}
        />
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={40}
            minSize={30}
            className="border rounded-xl"
          >
            <ProblemComponentDetails
              problem={problem}
              problemSubmitStatus={problemSubmitStatus}
            />
          </ResizablePanel>

          <ResizableHandle className="hidden md:block w-1 bg-charcoal/20  hover:bg-muted-foreground rounded-full my-6" />

          <ResizablePanel
            defaultSize={60}
            minSize={30}
            className="px-4 border rounded-xl"
          >
            <CodeEditor
              problem={problem}
              handleRun={handleRun}
              handleSubmit={handleSubmit}
              problemRunStatus={problemRunStatus}
              problemSubmitStatus={problemSubmitStatus}
              clearConsole={clearConsole}
              isPending={isPending}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}
