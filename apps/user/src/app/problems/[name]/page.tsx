import { getProblemDetails } from "@/app/actions/problems";
import { getUserSubmissions } from "@/app/actions/submissions";
import NavigationPane from "@/components/NavigationPane";
import DispayProblem from "@/app/problems/[name]/_components/DispayProblem";

export const dynamic = "force-dynamic";

export default async function SingleProblemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const problem = await getProblemDetails(name);
  const userSubmissions = await getUserSubmissions(problem?.id);

  return (
    <div className="flex w-full flex-col rounded-xl my-4 mr-4 border-1 overflow-hidden">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <div className="flex items-center">
          <div>{/* TODO */}</div>

          <div className="flex-1">
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
