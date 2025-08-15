import { Testcase } from "@/lib/types";

export async function getTestcasesByProblemID(
  id: string
): Promise<{ data: Testcase[] }> {
  if (!id) {
    throw new Error("No problem slug provided");
  }

  const res = await fetch(
    `http://localhost:8080/api/v1/testcases/problem/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch testcases: ${res.statusText}`);
  }

  const testcases = (await res.json()) as { data: Testcase[] };
  return testcases;
}
