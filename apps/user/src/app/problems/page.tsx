import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/problems/_components/app-sidebar";
import ProblemUI from "./_components/ProblemUI";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProblemPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<div>Loading problems UI...</div>}>
          <ProblemUI />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
