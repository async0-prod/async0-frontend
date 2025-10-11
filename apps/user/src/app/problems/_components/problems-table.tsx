"use client";

import { getTanstackTableProblems } from "@/lib/problem";
import { columns } from "@/app/problems/columns";
import { DataTable } from "@/app/problems/_components/data-table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

export default function ProblemsTable({
  selectedListID,
  handleRowClick,
}: {
  selectedListID: string | undefined;
  handleRowClick: (slug: string, name: string) => void;
}) {
  const {
    data: problems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["problems", selectedListID],
    queryFn: () => getTanstackTableProblems(selectedListID),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-2.5 overflow-auto">
        <div className="flex items-center gap-2 pb-2">
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-9 w-64" />
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 ml-auto h-9 w-40" />
        </div>

        <div className="overflow-hidden rounded-md border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-20" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-charcoal dark:text-almond flex flex-col items-center justify-center rounded-md p-8">
        <AlertTriangle size={40} className="mb-2 text-red-600" />
        <p className="font-semibold">Failed to load problems</p>
        <p className="text-sm">Please try again later</p>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={problems?.data ?? []}
      handleRowClick={handleRowClick}
    />
  );
}
