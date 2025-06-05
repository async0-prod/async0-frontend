"use client";

import { problemNameMapping } from "@/lib/mapping";
import { submissionRun, submissionSubmit } from "@/lib/submission";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  judge0ResponseType,
  problemType,
  userSubmissionType,
} from "@/lib/types";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";

export default function DispayProblem({
  problem,
  userSubmissions,
}: {
  problem: problemType | undefined;
  userSubmissions: userSubmissionType | undefined;
}) {
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
    if (!session) {
      toast.error("You need to login first");
      return;
    }

    startTransition(async () => {
      const res = await submissionRun(value);
      setProblemRunStatus(res);
    });
  }

  function handleSubmit(value: string) {
    if (!session) {
      toast.error("You need to login first");
      return;
    }

    if (!problem) {
      toast.error("No problem found");
      return;
    }

    startTransition(async () => {
      const res = await submissionSubmit(value, problem.testcases, problem.id);
      setProblemSubmitStatus(res);
    });
  }

  function clearConsole() {
    setProblemRunStatus(null);
    setProblemSubmitStatus(null);
  }

  return (
    <>
      <div className="lg:hidden">
        {ProblemComponentDetails && (
          <ProblemComponentDetails
            problem={problem}
            problemSubmitStatus={problemSubmitStatus}
            userSubmissions={userSubmissions}
          />
        )}
      </div>
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={30} className="rounded-xl">
            {ProblemComponentDetails && (
              <ProblemComponentDetails
                problem={problem}
                problemSubmitStatus={problemSubmitStatus}
                userSubmissions={userSubmissions}
              />
            )}
          </ResizablePanel>

          <ResizableHandle className="hidden md:block w-1 bg-charcoal/20  hover:bg-muted-foreground rounded-full my-6" />

          <ResizablePanel
            defaultSize={60}
            minSize={30}
            className="px-4 rounded-xl pt-2 pb-4"
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
      </div>
    </>
  );
}
