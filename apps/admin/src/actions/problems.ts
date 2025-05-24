import { auth } from "@/lib/auth";
import { ProblemType } from "@/lib/types";

export async function getAllProblems() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/problem`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );
    const problems = (await res.json()) as ProblemType[];
    return problems;
  } catch (error) {
    console.error("Error fetching all problems", error);
  }
}

export async function getProblemById(problemId: string) {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/problem/${problemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );
    const problem = (await res.json()) as ProblemType;
    return problem;
  } catch (error) {
    console.error("Error fetching problem details", error);
  }
}

export async function addProblem(body: {
  name: string;
  link: string;
  difficulty: string;
  listId: string;
  topicId: string;
  starterCode: string;
  // solutions: { code: string; rank: string }[];
  testcases: { input: string; output: string }[];
}) {
  const session = await auth();
  const token = session?.accessToken;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/problem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error adding problem", error);
  }
}

export async function updateProblem(
  problemId: string,
  body: {
    name: string;
    link: string;
    difficulty: string;
    listId: string;
    topicId: string;
    starterCode: string;
    // solutions: { code: string; rank: string }[];
    testcases: { input: string; output: string }[];
  }
) {
  const session = await auth();
  const token = session?.accessToken;

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/problem/${problemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.error("Error adding problem", error);
  }
}

export async function deleteProblem(id: string) {
  const session = await auth();
  const token = session?.accessToken;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/problem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error deleting problem", error);
  }
}
