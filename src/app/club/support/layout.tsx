import { headers } from "next/headers";
import { HEADER_HEIGHT } from "@/lib/constants";
import Header from "@/components/header/Header";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const initialIsMobile = /mobile/i.test(userAgent);

  return (
    <>
      <Header initialIsMobile={initialIsMobile} isLoggedIn type="club" />
      <main className="pt-20 pb-40 px-10" style={{ marginTop: HEADER_HEIGHT }}>
        {children}
      </main>
    </>
  );
}
