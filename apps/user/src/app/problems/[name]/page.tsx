import { getProblemDetails } from "@/app/actions/problems";
import { getUserSubmissions } from "@/app/actions/submissions";
import NavigationPane from "@/components/NavigationPane";
import DispayProblem from "@/app/problems/[name]/_components/DispayProblem";
import BreadCrumbs from "@/components/Breadcrumbs";

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
    <div className="flex w-full flex-col lg:rounded-xl lg:m-4 overflow-hidden font-nunito dark:text-almond bg-almond dark:bg-charcoal dark:border-almond/20 dark:border">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center py-2 px-4">
          <div className="hidden lg:block">
            <BreadCrumbs />
          </div>

          <div className="flex-1">
            <NavigationPane />
          </div>
        </div>

        <DispayProblem problem={problem} userSubmissions={userSubmissions} />
      </main>
    </div>
  );
}
