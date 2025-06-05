import { getProblemSolvedComponentData } from "@/app/actions/problems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default async function ProblemSolved() {
  const data = await getProblemSolvedComponentData();
  return (
    <Card className="bg-charcoal text-almond dark:bg-almond dark:text-charcoal">
      <CardHeader className="flex flex-row items-center justify-start">
        <div className="bg-almond p-2 rounded-md dark:bg-charcoal">
          <CheckCircle size={20} className=" text-charcoal dark:text-almond" />
        </div>
        <CardTitle className="text-sm tracking-wider pl-1 text-left max-w-48">
          Total Problems Solved
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data?.total_problems_solved ?? 0}
        </div>
        {data && data.percentage_change && (
          <p className="text-xs text-almond/60">{`+${data.percentage_change.toFixed(2)}% from last month`}</p>
        )}
      </CardContent>
    </Card>
  );
}
