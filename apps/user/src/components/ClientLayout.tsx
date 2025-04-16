"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import BreadCrumbs from "@/components/Breadcrumbs";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <Navbar />
        <BreadCrumbs />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
