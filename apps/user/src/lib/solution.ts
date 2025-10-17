import { env } from "next-runtime-env";
import { Solution } from "./types";

export async function getSolutionsByProblemID(
  id: string,
): Promise<{ data: Solution[] }> {
  if (!id) {
    throw new Error("No problem slug provided");
  }

  const res = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/solutions/problem/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch solutions: ${res.statusText}`);
  }

  const solutions = (await res.json()) as { data: Solution[] };
  return solutions;
}
