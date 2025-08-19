"use client";

import { getAllListProblems } from "@/app/fetch/problem";
import { columns } from "@/app/problems/columns";
import { DataTable } from "@/app/problems/_components/DataTable";
import { useQuery } from "@tanstack/react-query";

export default function ProblemsTable({
  selectedListID,
  handleRowClick,
}: {
  selectedListID: string | undefined;
  handleRowClick: (slug: string, name: string) => void;
}) {
  const { data: problems } = useQuery({
    queryKey: ["problems", selectedListID],
    queryFn: () => getAllListProblems(selectedListID),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <DataTable
      columns={columns}
      data={problems?.data ?? []}
      handleRowClick={handleRowClick}
    />
  );
}
