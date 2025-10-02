import BreadCrumbs from "@/components/Breadcrumbs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ToggleTheme from "../_components/ToggleTheme";
import UserAuth from "../_components/UserAuth";
import { AppSidebar } from "./_components/AppSidebar";

export default async function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false} className="bg-charcoal">
      <AppSidebar />
      <SidebarInset className="bg-almond dark:bg-charcoal my-4 rounded-xl">
        <header className="px-8 pt-8 pb-4">
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            <BreadCrumbs />
            <div className="lg:ml-auto lg:flex lg:gap-2">
              <ToggleTheme />
              <UserAuth />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
