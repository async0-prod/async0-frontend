import { SessionUser } from "@/lib/types";
import { env } from "next-runtime-env";

export async function getClientSideSession(): Promise<{
  data: SessionUser;
} | null> {
  const response = await fetch(`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching client-side session");
  }

  return await response.json();
}
