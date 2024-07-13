import "@/styles/globals.css";
import type { Metadata } from "next";
import Favicon from "../../public/favicon/favicon.ico";
import Providers from "@/lib/providers";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "오늘뭐해, omo",
  description: "직장인들의 놀이터 omo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link rel="icon" href={Favicon.src} type="image/x-icon" />
      <body className="font-suit w-dvw overflow-x-hidden">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
