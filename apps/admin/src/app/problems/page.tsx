import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProblemsTable } from "./_components/ProblemsTable";

export default function AdminProblemPage() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Problem Board</h3>
          <p className="text-sm">
            You can activate/deactivate or modify problems here.
          </p>
        </div>
        <Button asChild>
          <Link href="/problems/new"> Add Problem </Link>
        </Button>
      </div>
      <ProblemsTable />
    </>
  );
}
