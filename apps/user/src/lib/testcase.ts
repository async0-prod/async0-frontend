import { Testcase } from "@/lib/types";
import { env } from "next-runtime-env";

export async function getTestcasesByProblemID(
  id: string,
): Promise<{ data: Testcase[] }> {
  if (!id) {
    throw new Error("No problem slug provided");
  }

  const res = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/testcases/problem/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch testcases: ${res.statusText}`);
  }

  const testcases = (await res.json()) as { data: Testcase[] };
  return testcases;
}
