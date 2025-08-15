export default async function ProblemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">{children}</div>
    </>
  );
}
