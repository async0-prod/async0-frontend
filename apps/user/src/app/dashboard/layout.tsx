export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex bg-charcoal">
        {/* <Sidebar /> */}
        {children}
      </div>
    </>
  );
}
