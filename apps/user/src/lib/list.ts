import { List } from "@/lib/types";

export async function getAllLists(): Promise<{
  data: List[];
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/lists`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: List[];
  }>;
}
