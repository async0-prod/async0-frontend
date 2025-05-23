import Sidebar from "@/components/Sidebar";

export default function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex bg-charcoal">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
