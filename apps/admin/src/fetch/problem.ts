import { Problem, ProblemBody } from "@/lib/types";

export async function createProblem(data: ProblemBody) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/problems`,
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating bookmark", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to bookmark request. Please try again.");
  }
}

export async function getAllProblems(): Promise<{ data: Problem[] }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/problems`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch problems: ${response.statusText}`);
  }

  return response.json();
}
