import ProblemsTable from "@/app/problems/_components/ProblemsTable";
import NavigationPane from "@/components/NavigationPane";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Activity, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProblemPage() {
  return (
    <div className="flex w-full flex-col rounded-xl my-4 mr-4 border-1 overflow-hidden">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <div className="flex items-center">
          <div>
            <div className="text-4xl font-bold">Problems</div>
            <p className="text-sm text-muted-foreground">
              {`At this pace, mcdonald's isn't that far!`}
            </p>
          </div>
          <div className="flex-1">
            <NavigationPane />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Problems Solved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 days</div>
              <p className="text-xs text-muted-foreground">Current streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 min</div>
              <p className="text-xs text-muted-foreground">Per problem</p>
            </CardContent>
          </Card>
        </div>

        <ProblemsTable />
      </main>
    </div>
  );
}
