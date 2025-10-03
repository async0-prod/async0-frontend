import { Topic } from "@/lib/types";

export async function getAllTopics(): Promise<{ data: Topic[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/topics`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch topics: ${res.statusText}`);
  }

  const topics = (await res.json()) as { data: Topic[] };
  return topics;
}
