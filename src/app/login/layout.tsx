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
      <main className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2">
        {children}
      </main>
      <ShortFooter />
    </>
  );
}
