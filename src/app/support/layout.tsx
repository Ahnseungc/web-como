import { HEADER_HEIGHT } from "@/lib/constants";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn type="club" />
      <main className="pt-20 pb-40 px-10" style={{ marginTop: HEADER_HEIGHT }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
