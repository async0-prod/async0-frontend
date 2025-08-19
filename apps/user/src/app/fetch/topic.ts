import { SidebarTopicList, Topic } from "@/lib/types";

export async function getSidebarTopicsByListID(
  listID: string
): Promise<{ data: SidebarTopicList }> {
  const response = await fetch(
    `http://localhost:8080/api/v1/topics?list_id=${listID}&problems=true`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching topics: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: SidebarTopicList;
  }>;
}
