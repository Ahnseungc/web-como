import { HEADER_HEIGHT } from "@/lib/constants";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pt-20 pb-40 px-10" style={{ marginTop: HEADER_HEIGHT }}>
      {children}
    </main>
  );
}
