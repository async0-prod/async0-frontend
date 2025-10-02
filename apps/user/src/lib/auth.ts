import { SessionUser } from "@/lib/types";

export async function getClientSideSession(): Promise<{
  data: SessionUser;
} | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching client-side session");
  }

  return await response.json();
}
