import ProblemsTable from "@/app/problems/_components/ProblemsTable";
import NavigationPane from "@/components/NavigationPane";
import ProblemSolved from "./_components/ProblemSolved";
import ProblemStreak from "./_components/ProblemStreak";
import BreadCrumbs from "@/components/Breadcrumbs";

export const dynamic = "force-dynamic";

export default async function ProblemPage() {
  return (
    <div className="flex w-full flex-col lg:rounded-xl lg:m-4 overflow-hidden font-nunito dark:text-almond bg-almond dark:bg-charcoal dark:border-almond/20 dark:border">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex justify-start items-center py-2 px-1">
          <div className="hidden lg:block">
            <BreadCrumbs />
          </div>

          <div className="flex-1">
            <NavigationPane />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <ProblemSolved />
          <ProblemStreak />
        </div>

        <ProblemsTable />
      </main>
    </div>
  );
}
