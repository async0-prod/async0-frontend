import { SidebarTopicList, Topic } from "@/lib/types";

export async function getSidebarTopicsByListID(
  listID: string
): Promise<{ data: SidebarTopicList }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/topics/list/${listID}?problems=true`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching topics by list ID: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: SidebarTopicList;
  }>;
}

export async function getAllTopics(): Promise<{ data: Topic[] }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/topics`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching topics: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: Topic[];
  }>;
}
