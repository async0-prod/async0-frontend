import { Problem, TanstackProblem } from "@/lib/types";

export async function getTanstackTableProblems(
  listID: string | undefined
): Promise<{ data: TanstackProblem[] }> {
  if (!listID) {
    throw new Error("List ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/problems/table/${listID}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as { data: TanstackProblem[] };
  return problems;
}

export async function getProblemDetailsBySlug(
  slug: string
): Promise<{ data: Problem }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/problems/${slug}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as { data: Problem };

  return problems;
}
