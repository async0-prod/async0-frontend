import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <>
      <div className="flex bg-charcoal">
        {/* <Sidebar /> */}
        {children}
      </div>
    </>
  );
}
