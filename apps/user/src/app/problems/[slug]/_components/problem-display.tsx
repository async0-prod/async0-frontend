"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CodeXml,
  FolderOpen,
  Lightbulb,
  // MessageCircle,
  // NotebookText,
} from "lucide-react";
import SolutionInfoCard from "./solution-info-card";
import { motion } from "motion/react";
import ProblemInfoCard from "./problem-info-card";
import { CodeSubmitResult, Problem } from "@/lib/types";
import SubmissionInfoCard from "./submission-info-card";
// import UserNotes from "./UserNotes";

export default function ProblemDisplay({
  problem,
  isLoadingProblem,
  isErrorProblem,
  problemSubmitResult,
}: {
  problem?: Problem;
  isLoadingProblem: boolean;
  isErrorProblem: boolean;
  problemSubmitResult: CodeSubmitResult | null;
}) {
  return (
    <Tabs defaultValue="problem" className="w-full px-6">
      <TabsList className="grid w-full grid-cols-5 bg-transparent">
        {[
          { value: "problem", icon: CodeXml, label: "Problem" },
          { value: "solution", icon: Lightbulb, label: "Solutions" },
          { value: "submission", icon: FolderOpen, label: "Submissions" },
          // { value: "notes", icon: NotebookText, label: "Notes" },
          // { value: "ai", icon: MessageCircle, label: "Ask AI" },
        ].map(({ value, icon: Icon, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="@container border-none"
          >
            <motion.div
              layout
              className="flex items-center gap-1 overflow-hidden"
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              <motion.span
                layout
                className="max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity] duration-300 ease-in-out @[6rem]:max-w-[100px] @[6rem]:opacity-100"
              >
                {label}
              </motion.span>
            </motion.div>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="problem">
        <ProblemInfoCard
          problem={problem}
          isProblemLoading={isLoadingProblem}
          isErrorProblem={isErrorProblem}
          problemSubmitResult={problemSubmitResult}
        />
      </TabsContent>

      <TabsContent value="solution">
        <SolutionInfoCard problem={problem} isErrorProblem={isErrorProblem} />
      </TabsContent>

      <TabsContent value="submission">
        <SubmissionInfoCard problem={problem} />
      </TabsContent>
      {/* <TabsContent value="notes">
        <UserNotes problem={problem} />
      </TabsContent> */}
    </Tabs>
  );
}
