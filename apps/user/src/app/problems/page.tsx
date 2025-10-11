import { Loader } from "lucide-react";
import ProblemUI from "./_components/problem-ui";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProblemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full flex-1 flex-col items-center justify-center">
          <div className="flex animate-spin items-center justify-center">
            <Loader />
          </div>
        </div>
      }
    >
      <ProblemUI />
    </Suspense>
  );
}
