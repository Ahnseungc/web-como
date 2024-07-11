import type { Metadata } from "next";
import Providers from "@/lib/providers";
import "@/styles/globals.css";

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
      <body className="font-suit">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
