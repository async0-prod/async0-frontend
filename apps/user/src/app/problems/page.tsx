import { Loader } from "lucide-react";
import ProblemUI from "./_components/ProblemUI";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProblemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex flex-col items-center justify-center h-screen">
          <div className="animate-spin flex items-center justify-center">
            <Loader />
          </div>
        </div>
      }
    >
      <ProblemUI />
    </Suspense>
  );
}
