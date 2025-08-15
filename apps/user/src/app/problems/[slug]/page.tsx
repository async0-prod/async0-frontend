import BreadCrumbs from "@/components/Breadcrumbs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import MainUI from "./_components/MainUI";

export const dynamic = "force-dynamic";

export default async function SingleProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 ml-16 p-8">
          <div className="flex gap-12 flex-col h-full">
            <div className="hidden lg:block">
              <BreadCrumbs />
            </div>

            <MainUI slug={slug} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
