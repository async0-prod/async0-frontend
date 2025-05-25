import { auth } from "@/lib/auth";
import { ListType } from "@/lib/types";

const pyBaseUrl = process.env.PYSERVER_URL ?? "http://127.0.0.1:8000/api/v1";

export async function getAllLists() {
  const session = await auth();
  const token = session?.accessToken;

  try {
    const res = await fetch(`${pyBaseUrl}/admin/list`, {
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
