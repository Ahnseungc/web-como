import { cn } from "@/lib/utils";

export default function ShopStatsSearchRanking() {
  return (
    <div className="flex h-full">
      <ul className="flex-1 flex flex-col h-full">
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
            <div
              className={cn(
                "flex-1 flex items-center font-bold",
                i === 0 ? "text-brand-orange" : ""
              )}
            >
              {"검색어"}
            </div>
          </li>
        ))}
      </ul>
      <ul className="flex-1 flex flex-col h-full">
        {Array.from({ length: 5 }).map((item, i) => (
          <li
            key={i}
            className="flex-1 flex border-b border-gray-400 body-1 font-medium text-gray-800"
          >
            <div className="flex items-center justify-center w-16">{i + 6}</div>
            <div className="flex-1 flex items-center font-bold">{"검색어"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
