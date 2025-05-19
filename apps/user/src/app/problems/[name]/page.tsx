import { getProblemDetails } from "@/app/actions/problems";
import { getUserSubmissions } from "@/app/actions/submissions";
import NavigationPane from "@/app/dashboard/_components/NavigationPane";
import DispayProblem from "@/app/problems/[name]/_components/DispayProblem";
import { problemType, userSubmissionType } from "@/lib/types";

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
  const userSubmissions: userSubmissionType[] | undefined =
    await getUserSubmissions(problem?.id);

  return (
    <div className="flex w-full flex-col rounded-xl my-4 mr-4 border-1 overflow-hidden">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-almond dark:bg-charcoal">
        <div className="flex items-center">
          <div>{/* TODO */}</div>

          <div className="ml-auto pr-8">
            <NavigationPane />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <DispayProblem problem={problem} userSubmissions={userSubmissions} />
        </div>
      </main>
    </div>
  );
}
