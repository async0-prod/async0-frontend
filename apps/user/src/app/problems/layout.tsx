import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ToggleTheme from "../_components/toggle-theme";
import UserAuth from "../_components/user-auth";
import { AppSidebar } from "./_components/app-sidebar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/components/breadcrumbs";

export default async function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="relative flex flex-col gap-6 md:peer-data-[variant=inset]:shadow-none">
        <header className="mx-8 mt-6 lg:mx-15">
          <div className="flex items-center justify-between lg:flex lg:items-center lg:justify-between">
            <div className="-ml-3 flex shrink-0 items-center gap-2 px-4">
              <SidebarTrigger
                className="hover:text-charcoal dark:hover:text-almond dark:text-muted-foreground text-muted-foreground cursor-pointer hover:bg-transparent lg:hidden dark:hover:bg-transparent"
                size={"sm"}
              />
              <Separator
                orientation="vertical"
                className="bg-charcoal dark:bg-almond mr-2 data-[orientation=vertical]:h-4 lg:hidden"
              />
              <Link href="/">
                <h1 className="dark:text-almond text-xl font-bold"> async0 </h1>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:ml-auto lg:flex lg:gap-2">
              <ToggleTheme />
              <UserAuth />
            </div>
          </div>
        </header>
        <div className="mb-2 px-10 lg:px-16">
          <BreadCrumbs />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
