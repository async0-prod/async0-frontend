import { getSidebarData } from "@/app/actions/sidebar";
import { SidebarData } from "./SidebarData";

export default async function Sidebar() {
  const data = await getSidebarData();
  return <SidebarData data={data ?? []} />;
}
