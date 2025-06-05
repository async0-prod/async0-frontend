import { getAllProblems } from "@/actions/problems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical } from "lucide-react";
import Link from "next/link";

export async function ProblemsTable() {
  const problems = await getAllProblems();

  if (!problems) {
    return <h1>No problems found</h1>;
  }

  return (
    <>
      {problems.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-0">
                <span className="sr-only">Available for Purchase</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Testcases</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => {
              return (
                <TableRow key={problem.id}>
                  <TableCell>
                    <span className="sr-only">Available</span>
                    <CheckCircle2 className="text-green-600" />
                    {/* {problem.isActiveForSubmission ? (
                      <>
                        <span className="sr-only">Available</span>
                        <CheckCircle2 className="text-green-600" />
                      </>
                    ) : (
                      <>
                        <span className="sr-only ">Unavailable</span>
                        <XCircle className="stroke-destructive" />
                      </>
                    )} */}
                  </TableCell>
                  <TableCell>{problem.name}</TableCell>
                  <TableCell>{problem.topic_problem[0]?.topic.name}</TableCell>
                  <TableCell>{problem.testcase.length}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <a download href={`/problems/${problem.id}/download`}>
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/problems/${problem.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {/* <ActiveToggleDropDownItem
                          id={product.id}
                          isavailableforpurchase={
                            product.isavailableforpurchase
                          }
                        /> */}
                        <DropdownMenuSeparator />
                        {/* <DeleteDropDownItem
                          id={product.id}
                          disabled={NumberOfOrders?.rows[0].count > 0}
                          imagePath={product.imagepath}
                          filePath={product.filepath}
                        /> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <h1>No problems found</h1>
      )}
    </>
  );
}
