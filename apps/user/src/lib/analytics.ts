import { CardAnalytics } from "@/lib/types";

export async function getCardAnalytics(
  listID: string
): Promise<{ data: CardAnalytics }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/analytics/list/${listID}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.statusText}`);
  }

  return response.json() as Promise<{
    data: CardAnalytics;
  }>;
}
