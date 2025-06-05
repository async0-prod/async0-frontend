import { SidebarData } from "@/components/SidebarData";
import { Suspense } from "react";
import { getSidebarData } from "../actions/sidebar";

export default async function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSidebarData();
  return (
    <>
      <div className="flex bg-charcoal">
        <Suspense
          fallback={<div className="bg-red-500">Sidebar Loading...</div>}
        >
          <SidebarData data={data ?? []} />
        </Suspense>
        {children}
      </div>
    </>
  );
}
