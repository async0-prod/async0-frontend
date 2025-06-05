"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookOpen, Lightbulb, NotebookText } from "lucide-react";
import {
  judge0ResponseType,
  problemType,
  userSubmissionType,
} from "@/lib/types";
import SolutionInfoCard from "@/app/problems/[name]/_components/SolutionInfoCard";
import ProblemInfoCard from "@/app/problems/[name]/_components/ProblemInfoCard";
import SubmissionInfoCard from "@/app/problems/[name]/_components/SubmissionInfoCard";

export default function HasDuplicate({
  problem,
  problemSubmitStatus,
  userSubmissions,
}: {
  problem: problemType;
  problemSubmitStatus: judge0ResponseType[] | null;
  userSubmissions: userSubmissionType | undefined;
}) {
  return (
    <Tabs defaultValue="problem" className="w-full p-4 sm:p-6">
      <TabsList className="grid w-full grid-cols-3 bg-transparent">
        <TabsTrigger value="problem" className="border-none">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Problem</span>
        </TabsTrigger>
        <TabsTrigger value="solution" className="border-none">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Solutions</span>
        </TabsTrigger>
        <TabsTrigger value="submission" className="border-none">
          <NotebookText className="h-3.5 w-3.5" />
          <span>Submissions</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="problem">
        <ProblemInfoCard
          problem={problem}
          problemSubmitStatus={problemSubmitStatus}
        />
      </TabsContent>

      <TabsContent value="solution">
        <SolutionInfoCard />
      </TabsContent>

      <TabsContent value="submission">
        <SubmissionInfoCard userSubmissions={userSubmissions} />
      </TabsContent>
    </Tabs>
  );
}
