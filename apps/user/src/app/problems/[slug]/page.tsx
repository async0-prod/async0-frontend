import Problem from "./_components/problem";

export default async function SingleProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="flex flex-col px-16">
      <Problem slug={slug} />
    </main>
  );
}
