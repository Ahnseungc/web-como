import { HEADER_HEIGHT } from "@/lib/constants";
import Header from "@/components/header/Header";
import ShortFooter from "@/components/footer/ShortFooter";

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
      <ShortFooter />
    </>
  );
}
