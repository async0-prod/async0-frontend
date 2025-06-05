import { getUserStreakComponentData } from "@/app/actions/problems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default async function ProblemStreak() {
  const data = await getUserStreakComponentData();
  return (
    <Card className="bg-almond dark:bg-charcoal text-charcoal dark:text-almond">
      <CardHeader className="flex flex-row items-center justify-start">
        <div className="bg-charcoal dark:bg-almond p-2 rounded-md ">
          <Activity size={20} className=" text-almond dark:text-charcoal" />
        </div>
        <CardTitle className="text-sm tracking-wider pl-1 text-left max-w-24">
          Current Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{`${data?.current_streak ?? 0}`}</div>
      </CardContent>
    </Card>
  );
}
