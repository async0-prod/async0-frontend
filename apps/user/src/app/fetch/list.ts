import { GetAllListsResponse } from "@/lib/types";

export async function getAllLists(): Promise<GetAllListsResponse> {
  const response = await fetch("http://localhost:8080/api/v1/lists", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.statusText}`);
  }

  return response.json() as Promise<GetAllListsResponse>;
}
