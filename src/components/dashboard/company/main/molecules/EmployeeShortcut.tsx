"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "@/assets/icons/chevron";

export default function EmployeeShortcut() {
  const pathname = usePathname();

  const Container = ({ children }: { children: React.ReactNode }) => {
    const style =
      "flex-1 space-y-4 max-w-[390px] p-8 rounded-xl bg-gray-0 select-none";

    if (pathname.endsWith("dashboard")) {
      return (
        <Link href={`./employee`} className={style}>
          {children}
        </Link>
      );
    } else {
      <div className={style}>{children}</div>;
    }
  };

  return (
    <Container>
      <div className="h4 font-medium text-gray-700 truncate">
        {"전체 임직원 수"}
      </div>
      <div className="flex items-center justify-between">
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"1234명"}
        </div>
        {pathname.endsWith("dashboard") && (
          <ChevronRight className="w-8 h-8 text-gray-600" />
        )}
      </div>
    </Container>
  );
}
