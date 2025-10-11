import { Separator } from "@/components/ui/separator";
import UpdateProblemForm from "@/components/UpdateProblemForm";
import { getListsByProblemId } from "@/lib/list";
import { getProblemById } from "@/lib/problem";
import { getSolutionsByProblemId } from "@/lib/solution";
import { getTestcasesByProblemId } from "@/lib/testcase";
import { getTopicsByProblemId } from "@/lib/topic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;

  const problemPromise = getProblemById(problemId);
  const listPromise = getListsByProblemId(problemId);
  const topicsPromise = getTopicsByProblemId(problemId);
  const testcasesPromise = getTestcasesByProblemId(problemId);
  const solutionsPromise = getSolutionsByProblemId(problemId);

  const [problem, lists, topics, testcases, solutions] = await Promise.all([
    problemPromise,
    listPromise,
    topicsPromise,
    testcasesPromise,
    solutionsPromise,
  ]);

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
      {problem ? (
        <UpdateProblemForm
          problem={problem.data}
          prevLists={lists.data}
          prevTopics={topics.data}
          prevTestcases={testcases.data}
          prevSolutions={solutions.data}
        />
      ) : (
        <h1>No problem found</h1>
      )}
    </>
  );
}
