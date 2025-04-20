import { getProblemDetails } from "@/app/actions/problems";
import DispayProblem from "@/components/DispayProblem";
import { problemType } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SingleProblemPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const problem: problemType | null = await getProblemDetails(
    name.split("-").join(" ")
  );

  return <DispayProblem problem={problem} />;
}
