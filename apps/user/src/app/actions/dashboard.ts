"use server";

import { auth } from "@/lib/auth";

const pyBaseUrl = process.env.PYSERVER_URL ?? "http://127.0.0.1:8000/api/v1";

export async function getProblems() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(`${pyBaseUrl}/user/problem/dashboard`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch problems: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching problems:", err);
    return [];
  }
}
