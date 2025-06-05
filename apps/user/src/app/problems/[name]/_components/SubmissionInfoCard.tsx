import { CodeBlock } from "@/components/Codeblock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { userSubmissionType } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { format, formatDistanceToNow } from "date-fns";
import { Table } from "lucide-react";

export default function SubmissionInfoCard({
  userSubmissions,
}: {
  userSubmissions: userSubmissionType | undefined;
}) {
  if (!userSubmissions) {
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
      <CardHeader className="p-0">
        <CardTitle className="flex items-center">Submissions</CardTitle>
        <CardDescription>
          {userSubmissions.length > 0
            ? "All submission results will be shows here"
            : "No submissions found"}
        </CardDescription>
      </CardHeader>
      {userSubmissions.length > 0 ? (
        <>
          <CardContent className="p-0">
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
  );
}
