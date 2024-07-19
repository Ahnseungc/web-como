import Header, { HEADER_HEIGHT } from "@/components/header/Header";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main
        className="flex justify-center py-[150px]"
        style={{ marginTop: HEADER_HEIGHT }}
      >
        {children}
      </main>
    </>
  );
}
