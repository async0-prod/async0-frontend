import { getAllLists } from "@/actions/lists";
import { getAllTopics } from "@/actions/topics";
import ProblemForm from "@/components/ProblemForm";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@async0/db";

export default async function EditProductPage({
  params,
}: {
  params: { problemId: string };
}) {
  const { problemId } = await params;
  const listsPromise = getAllLists();
  const topicsPromise = getAllTopics();

  const problemPromise = prisma.problem.findUnique({
    where: { id: problemId },
    include: {
      testcase: { select: { input: true, output: true } },
      list_problem: { select: { list: { select: { name: true, id: true } } } },
      topic_problem: {
        select: { topic: { select: { name: true, id: true } } },
      },
      solution: { select: { code: true, rank: true } },
    },
  });

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
