import ProblemForm from "@/components/ProblemForm";
import { Separator } from "@/components/ui/separator";

export default async function NewProblemPage() {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Edit Problem</h3>
        <p className="text-sm ">
          Edit problem here. Minimum 1 and maximum 5 testcases allowed at
          present.
        </p>
      </div>
      <Separator className="mb-4" />
      <ProblemForm />
    </>
  );
}
