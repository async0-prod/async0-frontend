"use server";

import { auth } from "@/lib/auth";
import { userSubmissionType } from "@/lib/types";

export async function getUserSubmissions(problemId?: string) {
  const session = await auth();
  const token = session?.accessToken;

  if (!problemId || !token) {
    return undefined;
  }

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/user/submission/${problemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

    const submissions = (await res.json()) as userSubmissionType;
    return submissions;
  } catch (error) {
    console.error("Error fetching user submissions", error);
  }
}

export async function postUserSubmission(
  status: string,
  problemId: string,
  passedTestcases: number,
  totalTestcases: number,
  code: string
) {
  const session = await auth();
  const token = session?.accessToken;

  const requestBody = {
    status,
    problem_id: problemId,
    passed_testcases: passedTestcases,
    total_testcases: totalTestcases,
    code: code,
  };
  try {
    fetch("http://127.0.0.1:8000/api/v1/user/submission", {
      method: "POST",
      body: JSON.stringify(requestBody),

      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error posting user submission", error);
  }
}
