import { auth } from "@/lib/auth";
import { TopicType } from "@/lib/types";

export async function getAllTopics() {
  const session = await auth();
  const token = session?.accessToken;

  const pyBaseUrl = process.env.PYSERVER_URL ?? "http://127.0.0.1:8000/api/v1";

  try {
    const res = await fetch(`${pyBaseUrl}/admin/topic`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const topics = (await res.json()) as TopicType;
    return topics;
  } catch (error) {
    console.error("Error fetching all topics", error);
  }
}
