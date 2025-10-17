import { Problem, TanstackProblem } from "@/lib/types";
import { env } from "next-runtime-env";

export async function getTanstackTableProblems(
  listID: string | undefined,
): Promise<{ data: TanstackProblem[] }> {
  if (!listID) {
    throw new Error("List ID is required");
  }

  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/problems/table/${listID}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as { data: TanstackProblem[] };
  return problems;
}

export async function getProblemDetailsBySlug(
  slug: string,
): Promise<{ data: Problem }> {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/problems/${slug}`,
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as { data: Problem };

  return problems;
}
