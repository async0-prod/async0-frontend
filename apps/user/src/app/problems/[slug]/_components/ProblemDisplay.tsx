"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CodeXml,
  FolderOpen,
  Lightbulb,
  MessageCircle,
  NotebookText,
} from "lucide-react";
import SolutionInfoCard from "./SolutionInfoCard";
import { motion } from "motion/react";
import ProblemInfoCard from "./ProblemInfoCard";
import { Problem } from "@/lib/types";

export default function ProblemDisplay({
  problem,
  isLoadingProblem,
  isErrorProblem,
}: {
  problem?: Problem;
  isLoadingProblem: boolean;
  isErrorProblem: boolean;
}) {
  return (
    <Tabs defaultValue="problem" className="w-full p-4 sm:p-6">
      <TabsList className="grid w-full grid-cols-5 bg-transparent">
        {[
          { value: "problem", icon: CodeXml, label: "Problem" },
          { value: "solution", icon: Lightbulb, label: "Solutions" },
          { value: "submission", icon: FolderOpen, label: "Submissions" },
          { value: "notes", icon: NotebookText, label: "Notes" },
          { value: "ai", icon: MessageCircle, label: "Ask AI" },
        ].map(({ value, icon: Icon, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="border-none @container"
          >
            <motion.div
              layout
              className="flex items-center gap-1 overflow-hidden"
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              <motion.span
                layout
                className="overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out @[6rem]:max-w-[100px] @[6rem]:opacity-100 max-w-0 opacity-0"
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
        />
      </TabsContent>

      <TabsContent value="solution">
        <SolutionInfoCard />
      </TabsContent>

      <TabsContent value="submission"></TabsContent>
      <TabsContent value="notes">
        {/* <UserNotes problem={problem} /> */}
      </TabsContent>
    </Tabs>
  );
}
