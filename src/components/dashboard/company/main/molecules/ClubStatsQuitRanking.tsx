import Link from "next/link";
import { cn } from "@/lib/utils";
import { COMPANY_DASHBOARD_ENDPOINT } from "@/lib/constants";

export default function ClubStatsQuitRanking() {
  return (
    <ul className="flex flex-col h-full">
      {Array.from({ length: 5 }).map((item, i) => (
        <li
          key={i}
          className="flex-1 flex border-b border-gray-400 body-1 font-medium text-gray-800"
        >
          <div
            className={cn(
              "flex items-center justify-center w-16",
              i === 0 ? "text-brand-orange" : ""
            )}
          >
            {i + 1}
          </div>
          <Link
            href={`${COMPANY_DASHBOARD_ENDPOINT}/club`}
            className={cn(
              "flex-1 flex items-center font-bold",
              i === 0 ? "text-brand-orange" : ""
            )}
          >
            <div>{"동호회명"}</div>
          </Link>
          <div
            className={cn(
              "flex items-center justify-center w-[120px]",
              i === 0 ? "text-gray-900" : "text-gray-500"
            )}
          >
            {"13명"}
          </div>
        </li>
      ))}
    </ul>
  );
}
