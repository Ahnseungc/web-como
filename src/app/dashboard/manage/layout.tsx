export default function ClubManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="gap-3 w-full p-[38px]">{children}</section>;
}
