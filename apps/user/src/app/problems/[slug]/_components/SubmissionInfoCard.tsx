import { getUserSubmissionsByProblemID } from "@/lib/submission";
import { CodeBlock } from "@/components/Codeblock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Problem } from "@/lib/types";

import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";

export default function SubmissionInfoCard({ problem }: { problem?: Problem }) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions", problem?.id],
    queryFn: () => getUserSubmissionsByProblemID(problem?.id as string),
    enabled: !!problem,
  });

  if (!submissions) {
    return (
      <Card className="bg-transparent border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond border-none shadow-none gap-4">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center">Submissions</CardTitle>
          <CardDescription>No submissions found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond border-none shadow-none gap-4 overflow-y-auto">
      {submissions.data.length > 0 ? (
        <>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-almond-darker hover:bg-transparent">
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Solution</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">
                    <p className="line-clamp-1">Testcases Passed</p>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Submission Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.data.map((sub, index) => {
                  const date = new Date(sub.created_at);
                  const formattedDate = format(
                    date,
                    "EEEE, d MMM, yyyy, h:mm a"
                  );
                  const timeAgo = formatDistanceToNow(date, {
                    addSuffix: true,
                  });
                  return (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell className="text-center">
                        <div
                          className={`font-medium ${sub.status === "AC" ? "text-green-600" : sub.status === "RE" ? "text-red-600" : "text-yellow-600"}`}
                        >
                          {sub.status === "AC"
                            ? "Pass"
                            : sub.status === "RE"
                              ? "Fail"
                              : "TLE"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center sm:table-cell">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"outline"}
                              size={"sm"}
                              className="bg-charcoal text-almond cursor-pointer hover:bg-almond-darker hover:text-charcoal"
                            >
                              code
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="bg-[#0d1117] border-none">
                            <DialogHeader>
                              <DialogTitle className="mb-2"></DialogTitle>
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
  );
}
