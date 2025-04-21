import ClientLayout from "@/components/ClientLayout";
import { getSidebarData } from "../actions/sidebar";

export type SidebarDataType = {
  name: string;
  topic: {
    name: string;
    topic_problem: {
      problem: {
        name: string;
        difficulty: string;
        time_limit: number | null;
        memory_limit: number | null;
      };
    }[];
  }[];
}[];

export default async function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarData: SidebarDataType | undefined = await getSidebarData();
  return <ClientLayout sidebarData={sidebarData}>{children}</ClientLayout>;
}
