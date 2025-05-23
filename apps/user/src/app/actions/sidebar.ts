"use server";

import { SidebarDataType } from "@/lib/types";

export async function getSidebarData() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/user/sidebar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const sidebarData = (await res.json()) as SidebarDataType;
    return sidebarData;
  } catch (error) {
    console.error("Error fetching all problems", error);
  }
}
