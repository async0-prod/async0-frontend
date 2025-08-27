import Problem from "./_components/Problem";

export const dynamic = "force-dynamic";

export default async function SingleProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="flex-1 flex flex-col ml-8 md:ml-16 mr-4 md:mr-8 p-8">
      <Problem slug={slug} />
    </main>
  );
}
