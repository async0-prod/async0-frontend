import { CardAnalytics } from "@/lib/types";
import { env } from "next-runtime-env";

export async function getCardAnalytics(
  listID: string,
): Promise<{ data: CardAnalytics }> {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/analytics/list/${listID}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: CardAnalytics;
  }>;
}
