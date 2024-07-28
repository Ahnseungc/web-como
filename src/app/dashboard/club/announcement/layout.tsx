export default function AnnouncementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col gap-3 w-full p-8">{children}</section>
  );
}
