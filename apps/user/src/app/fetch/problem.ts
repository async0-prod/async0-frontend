import { GetAllListProblemsResponse, Problem } from "@/lib/types";

export async function getAllListProblems(
  listID: string | undefined
): Promise<GetAllListProblemsResponse> {
  if (!listID) {
    throw new Error("List ID is required");
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/problems/list/${listID}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as GetAllListProblemsResponse;
  return problems;
}

export async function getProblemDetailsBySlug(
  slug: string
): Promise<{ data: Problem }> {
  const response = await fetch(
    `http://localhost:8080/api/v1/problems/slug/${slug}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching list problems: ${response.statusText}`);
  }

  const problems = (await response.json()) as { data: Problem };

  return problems;
}
