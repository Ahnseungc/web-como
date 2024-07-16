import { Suspense } from "react";
import Loading from "@/app/loading";

export default function ClubManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col gap-3 w-full p-[38px]">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
