import "@/styles/globals.css";
import type { Metadata } from "next";
import Favicon from "../../public/favicon/favicon.ico";
import Providers from "@/lib/providers";
import { ToastContainer } from "@/components/common/ToastContainer";

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
      <Providers>
        <body className="min-h-screen font-suit antialiased bg-gray-50">
          <ToastContainer>{children}</ToastContainer>
        </body>
      </Providers>
    </html>
  );
}
