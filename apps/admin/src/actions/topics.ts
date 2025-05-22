import { auth } from "@/lib/auth";
import { TopicType } from "@/lib/types";

export async function getAllTopics() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/topic`, {
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
