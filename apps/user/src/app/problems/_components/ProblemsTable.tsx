"use client";

import { getTanstackTableProblems } from "@/lib/problem";
import { columns } from "@/app/problems/columns";
import { DataTable } from "@/app/problems/_components/DataTable";
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
        <div className="flex items-center pb-2 gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-40 ml-auto" />
        </div>

        <div className="overflow-hidden rounded-md p-2 border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
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
      <div className="flex flex-col items-center justify-center p-8 border rounded-md bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300">
        <AlertTriangle className="h-8 w-8 mb-2" />
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
