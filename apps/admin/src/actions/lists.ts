import { auth } from "@/lib/auth";
import { ListType } from "@/lib/types";

export async function getAllLists() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
    const lists = (await res.json()) as ListType;
    return lists;
  } catch (error) {
    console.error("Error fetching all lists", error);
  }
}
