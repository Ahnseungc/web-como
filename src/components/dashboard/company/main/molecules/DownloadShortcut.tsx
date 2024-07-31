import Link from "next/link";
import { COMPANY_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { ChevronRight } from "@/assets/icons/chevron";

export default function DownloadShortcut() {
  return (
    <Link
      href={`${COMPANY_DASHBOARD_ENDPOINT}/employee`}
      className="flex-1 space-y-4 max-w-[390px] p-8 rounded-xl bg-gray-0 select-none"
    >
      <div className="h4 font-medium text-gray-700 truncate">
        {"접속기록 다운로드"}
      </div>
      <div className="flex items-center justify-between">
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"현재 1234명"}
        </div>
        <ChevronRight className="w-8 h-8 text-gray-600" />
      </div>
    </Link>
  );
}
