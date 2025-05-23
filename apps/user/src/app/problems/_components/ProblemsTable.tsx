import { getAllProblems } from "@/app/actions/problems";
import { columns } from "@/app/problems/columns";
import { DataTable } from "@/app/problems/data-table";

export default async function ProblemsTable() {
  const problems = await getAllProblems();

  return <DataTable columns={columns} data={problems ?? []} />;
}
