export default function ReservationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col gap-3 w-full p-8">{children}</section>
  );
}
