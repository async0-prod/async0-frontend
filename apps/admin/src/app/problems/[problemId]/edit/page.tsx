import { getAllLists } from "@/actions/lists";
import { getProblemById } from "@/actions/problems";
import { getAllTopics } from "@/actions/topics";
import ProblemForm from "@/components/ProblemForm";
import { Separator } from "@/components/ui/separator";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  const listsPromise = getAllLists();
  const topicsPromise = getAllTopics();
  const problemPromise = getProblemById(problemId);

  const [lists, topics, problem] = await Promise.all([
    listsPromise,
    topicsPromise,
    problemPromise,
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
        <ProblemForm problem={problem} lists={lists} topics={topics} />
      ) : (
        <h1>No problem found</h1>
      )}
    </>
  );
}
