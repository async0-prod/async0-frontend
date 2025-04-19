"use server";

import { auth } from "@/lib/auth";

export async function getProblems() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/problem/dashboard`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

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
