import Header, { HEADER_HEIGHT } from "@/components/header/Header";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn title="동호회 관리센터" />
      <main
        className="flex justify-center py-[150px]"
        style={{ marginTop: HEADER_HEIGHT }}
      >
        {children}
      </main>
    </>
  );
}
