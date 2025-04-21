import Link from "next/link";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { ChevronRight } from "@/assets/icons/chevron";

export default function DashboardCalendarShortcut() {
  return (
    // <Link
    //   href={`${CLUB_DASHBOARD_ENDPOINT}/manage/calendar`}
    //   className="flex justify-between p-8 rounded-xl bg-gray-0 select-none"
    // >
    //   <h3 className="h1 font-bold text-gray-900 truncate">
    //     {"캘린더 바로가기"}
    //   </h3>
    //   <ChevronRight className="w-9 h-9 text-gray-700" />
    // </Link>
    <div className="flex justify-between p-8 rounded-xl bg-gray-0 select-none">
      <h3 className="h1 font-bold text-gray-900 truncate">
        {"캘린더 바로가기"}
      </h3>
      <ChevronRight className="w-9 h-9 text-gray-700" />
    </div>
  );
}
