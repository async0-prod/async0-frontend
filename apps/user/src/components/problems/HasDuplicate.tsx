"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  BookOpen,
  Lightbulb,
  NotebookText,
  CheckCheck,
  Bookmark,
} from "lucide-react";
import { unescapeCode } from "@/lib/codeFormat";
import { motion } from "motion/react";
import {
  judge0ResponseType,
  problemType,
  testcaseType,
  userSubmissionType,
} from "@/lib/types";
import { CodeBlock } from "../Codeblock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { format, formatDistanceToNow } from "date-fns";

const code = `
  const hasPath = (graph, src, dst) => {
    if (src === dst) return true

    const stack = [src]

    while(stack.length != 0){
      const current = stack.pop()
      if(current === dst) return true

      for(let neighbor of graph[current]){
        stack.push(neighbor)
      }
    }

    return false

  };

`;

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
        <TabsTrigger value="problem">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Problem</span>
        </TabsTrigger>
        <TabsTrigger value="solution">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Solutions</span>
        </TabsTrigger>
        <TabsTrigger value="submission">
          <NotebookText className="h-3.5 w-3.5" />
          <span>Submissions</span>
        </TabsTrigger>
      </TabsList>
      <ProblemInfoCard
        problem={problem}
        problemSubmitStatus={problemSubmitStatus}
      />
      <SolutionInfoCard />
      <SubmissionInfoCard userSubmissions={userSubmissions} />
    </Tabs>
  );
}

function ProblemInfoCard({
  problem,
  problemSubmitStatus,
}: {
  problem: problemType;
  problemSubmitStatus: judge0ResponseType[] | null;
}) {
  const { name, difficulty, testcases } = problem;

  return (
    <TabsContent value="problem">
      <Card className="bg-transparent border-charcoal/20">
        <CardHeader>
          <div className="flex justify-between items-start ">
            <div>
              <CardTitle className="text-2xl font-semibold truncate max-w-100 mb-2">
                {name}
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-xs rounded-full bg-charcoal/5 px-2 py-0.5">
                  <span>Time: O(1)</span>
                </div>
                <div className="flex items-center gap-0.5 text-xs rounded-full bg-charcoal/5 px-2 py-0.5">
                  <span>Space: O(n)</span>
                </div>
                <div className="flex items-center gap-0.5 text-xs rounded-full bg-charcoal/5 px-2 py-0.5">
                  <CheckCheck size={13} className="text-charcoal" />
                  <span>67</span>
                </div>
                <div className="flex items-center gap-0.5 text-xs rounded-full bg-charcoal/5 px-2 py-0.5">
                  <Bookmark size={13} className="text-charcoal" />
                  <span>343</span>
                </div>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 ">
              <Badge
                variant={"outline"}
                className="bg-charcoal/5 text-charcoal border-charcoal/20"
              >
                Completed
              </Badge>
              <Badge
                variant={"outline"}
                className="bg-charcoal/5 text-charcoal border-charcoal/20"
              >
                {difficulty}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              Given an integer array nums, return true if any value appears more
              than once in the array, otherwise return false.
            </div>

            {testcases.map((testcase, i) => {
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
                    testcaseStatus={
                      problemSubmitStatus ? problemSubmitStatus[i] : null
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function SolutionInfoCard() {
  return (
    <TabsContent value="solution" className="space-y-4">
      <Card className="p-4">
        <h3 className="font-medium">Example 1:</h3>
        <CodeBlock code={code} lang="ts" />
      </Card>
    </TabsContent>
  );
}

function SubmissionInfoCard({
  userSubmissions,
}: {
  userSubmissions: userSubmissionType | undefined;
}) {
  if (!userSubmissions) {
    return (
      <TabsContent value="submission" className="space-y-4">
        <Card className="overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center">Submissions</CardTitle>
            <CardDescription>No submissions found</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="submission" className="space-y-4">
      <Card className="overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center">Submissions</CardTitle>
          <CardDescription>
            {userSubmissions.length > 0
              ? "All submission results will be shows here"
              : "No submissions found"}
          </CardDescription>
        </CardHeader>
        {userSubmissions.length > 0 ? (
          <>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Solution</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">
                      <p className="line-clamp-1">Testcases Passed</p>
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSubmissions.map((sub, index) => {
                    const date = new Date(sub.created_at);
                    const formattedDate = format(
                      date,
                      "EEEE, d MMM, yyyy, h:mm a"
                    );
                    const timeAgo = formatDistanceToNow(date, {
                      addSuffix: true,
                    });
                    return (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          <div
                            className={`font-medium ${sub.status === "Accepted" ? "text-green-600" : sub.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}
                          >
                            {sub.status === "Accepted"
                              ? "Pass"
                              : sub.status === "Rejected"
                                ? "Fail"
                                : "TLE"}
                          </div>
                        </TableCell>
                        <TableCell className="text-center sm:table-cell">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant={"outline"} size={"sm"}>
                                code
                              </Button>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="mb-2">
                                  <div className="w-72 overflow-hidden">
                                    Your Solution
                                  </div>
                                </DialogTitle>
                                <DialogDescription className="overflow-auto">
                                  <CodeBlock code={sub.code} />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center">{`${sub.passed_testcases} / ${sub.total_testcases}`}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          <div className="font-medium line-clamp-1">
                            {formattedDate}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline md:line-clamp-1">
                            {timeAgo}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </>
        ) : null}
      </Card>
    </TabsContent>
  );
}

function TestCaseBlock({
  testcase,
  testcaseStatus,
}: {
  testcase: testcaseType;
  testcaseStatus: judge0ResponseType | null;
}) {
  function getStatusColor(statusId: number | null) {
    switch (statusId) {
      case 3: // Accepted
        return "text-green-800 border-green-300";
      case 4: // Wrong Answer
        return "text-red-800 border-red-300";
      case 5: // Time Limit Exceeded
        return "text-yellow-800 border-yellow-300";
      default:
        return " border-charcoal/20";
    }
  }

  return (
    <Card
      className={`px-4 py-4 mb-6 text-sm text-muted-foreground overflow-x-auto text-nowrap bg-transparent border-charcoal/20 ${getStatusColor(testcaseStatus?.status.id ?? null)}`}
    >
      <div className="flex flex-col items-start justify-between">
        {/* <code>Testcase - {i}</code> */}
        <div>
          <pre className="overflow-x-auto">
            <code>{`${unescapeCode(testcase.input)}`}</code>
          </pre>
          <pre className="overflow-x-auto">{`Output: ${unescapeCode(
            testcase.output
          )}`}</pre>
        </div>
      </div>
    </Card>
  );
}
