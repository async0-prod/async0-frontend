"use server";

import { auth } from "@/lib/auth";
import {
  problemType,
  userProblemSolvedStatType,
  userProblemStreakStatType,
  userProblemTableDataType,
} from "@/lib/types";

const pyBaseUrl = process.env.PYSERVER_URL ?? "http://127.0.0.1:8000/api/v1";

export async function getAllProblems() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(`${pyBaseUrl}/user/problems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const problems = (await res.json()) as userProblemTableDataType[];
    return problems;
  } catch (error) {
    console.error("Error fetching all problems", error);
  }
}

export async function getProblemDetails(problemName: string) {
  const name = problemName.split("-").join(" ");

  try {
    const res = await fetch(`${pyBaseUrl}/user/problems/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const problem = (await res.json())[0] as problemType;
    return problem;
  } catch (error) {
    console.error("Error fetching problem details", error);
  }
}

export async function getProblemSolvedComponentData() {
  const session = await auth();
  const token = session?.accessToken;

  if (!session || !token) return undefined;

  try {
    const res = await fetch(`${pyBaseUrl}/user/problem/stat/problem`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const problems = (await res.json()) as userProblemSolvedStatType;
    return problems;
  } catch (error) {
    console.error("Error fetching all problems", error);
  }
}

export async function getUserStreakComponentData() {
  const session = await auth();
  const token = session?.accessToken;

  if (!session || !token) return undefined;

  try {
    const res = await fetch(`${pyBaseUrl}/user/problem/stat/streak`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const problems = (await res.json()) as userProblemStreakStatType;
    return problems;
  } catch (error) {
    console.error("Error fetching all problems", error);
  }
}
