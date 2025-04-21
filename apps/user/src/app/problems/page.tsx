import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllProblems } from "../actions/problems";
import { auth } from "@/lib/auth";

export default async function ProblemPage() {
  const session = await auth();
  const problems = await getAllProblems(session?.userId);

  return (
    <div className="container w-full p-4 mx-auto">
      {problems ? <DataTable columns={columns} data={problems} /> : null}
    </div>
  );
}
