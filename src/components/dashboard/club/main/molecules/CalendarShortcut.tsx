import Link from "next/link";
import { ChevronRight } from "@/assets/icons/chevron";

export default function DashboardCalendarShortcut() {
  return (
    <Link
      href={"/dashboard/manage/calendar"}
      className="flex justify-between p-8 rounded-xl bg-gray-0 select-none"
    >
      <h3 className="h1 font-bold text-brand-black truncate">
        {"캘린더 바로가기"}
      </h3>
      <ChevronRight className="w-9 h-9 text-brand-black" />
    </Link>
  );
}
