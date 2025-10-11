import { List } from "@/lib/types";

export async function getAllLists(): Promise<{ data: List[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/lists`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch lists: ${res.statusText}`);
  }

  const lists = (await res.json()) as { data: List[] };
  return lists;
}

export async function getListsByProblemId(problemID: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/lists/problem/${problemID}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch lists: ${res.statusText} for problem ID ${problemID}`
    );
  }

  const lists = (await res.json()) as { data: List[] };
  return lists;
}
