"use client";

import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSolutionsByProblemID } from "@/lib/solution";
import { Problem, Solution } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface SolutionInfoCardProps {
  problem?: Problem;
  isErrorProblem: boolean;
}

export default function SolutionInfoCard({
  problem,
  isErrorProblem,
}: SolutionInfoCardProps) {
  const {
    data: solutions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["solution", problem?.id],
    queryFn: () => getSolutionsByProblemID(problem!.id),
  });

  if (isLoading) {
    return (
      <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
        <div className="mb-6 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="bg-charcoal/10 dark:bg-almond/10 size-10 rounded-full"
            />
          ))}
        </div>

        <div className="mb-6 w-full">
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-[200px] w-full rounded-lg" />
        </div>

        <section className="mb-4 flex flex-col gap-2">
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-24" />
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-3 w-3/4" />
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-3 w-2/3" />
        </section>

        <section className="mb-4 flex flex-col gap-2">
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-20" />
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-3 w-3/4" />
          <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-3 w-2/3" />
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-3 w-24" />
              <Skeleton className="bg-charcoal/10 dark:bg-almond/10 h-4 w-16" />
            </div>
          ))}
        </section>
      </Card>
    );
  }

  if (isError || isErrorProblem) {
    return (
      <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center">Solutions</CardTitle>
          <CardDescription>Error loading solutions</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!solutions || solutions.data.length === 0) {
    return (
      <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center">Solutions</CardTitle>
          <CardDescription>No solutions found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
      <Tabs defaultValue="0" className="flex flex-col items-center">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          {solutions.data.map((_, index) => {
            return (
              <TabsTrigger
                value={index.toString()}
                className="data-[state=active]:bg-charcoal data-[state=active]:text-almond dark:data-[state=active]:bg-almond dark:data-[state=active]:text-charcoal border-charcoal/20 dark:border-almond-darker/50 flex size-10 items-center justify-center rounded-full"
              >
                {index + 1}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6 w-full">
          {solutions.data.map((sol, index) => {
            return (
              <TabsContent
                key={sol.id}
                value={String(index)}
                className="flex flex-col gap-6"
              >
                <section>
                  <CodeTabs
                    lang="js"
                    codes={{
                      Javascript: sol.code,
                    }}
                  />
                </section>

                <section>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Trick
                  </h3>
                  <div className="text-sm leading-relaxed">
                    {sol.code_explanation || "No trick provided."}
                  </div>
                </section>

                <section>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Notes
                  </h3>
                  <div className="text-sm leading-relaxed">
                    {sol.notes || "No notes provided."}
                  </div>
                </section>

                <section>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <MetaRow
                      label="Space Complexity"
                      value={<span>{sol.space_complexity || "—"}</span>}
                    />
                    <MetaRow
                      label="Time Complexity"
                      value={<span>{sol.time_complexity || "—"}</span>}
                    />
                    <MetaRow
                      label="Difficulty"
                      value={<span>{sol.difficulty_level}</span>}
                    />
                  </div>
                </section>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </Card>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="text-sm">{value}</div>
    </div>
  );
}
