import { getSidebarData } from "@/app/actions/sidebar";
import { SidebarData } from "./SidebarData";
import { Suspense } from "react";

export default async function Sidebar() {
  const data = await getSidebarData();
  return (
    <Suspense fallback={<div>Sidebar Loading...</div>}>
      <SidebarData data={data ?? []} />
    </Suspense>
  );
}
