import { List } from "@/lib/types";
import { env } from "next-runtime-env";

export async function getAllLists(): Promise<{
  data: List[];
}> {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/lists`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: List[];
  }>;
}
