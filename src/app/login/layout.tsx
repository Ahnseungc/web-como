import { headers } from "next/headers";
import Header from "@/components/header/Header";
import ShortFooter from "@/components/footer/ShortFooter";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const initialIsMobile = /mobile/i.test(userAgent);

  return (
    <>
      <Header initialIsMobile={initialIsMobile} />
      <main className="flex items-center justify-center min-h-screen h-full">
        {children}
      </main>
      <ShortFooter />
    </>
  );
}
