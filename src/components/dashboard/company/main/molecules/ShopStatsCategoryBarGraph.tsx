import { cn } from "@/lib/utils";

const categories = [
  { key: "art", count: 2, name: "문화/예술" },
  { key: "activity", count: 6, name: "액티비티" },
  { key: "creative", count: 4, name: "크리에이티브" },
  { key: "food", count: 16, name: "F&B" },
  { key: "networking", count: 8, name: "네트워킹" },
  { key: "study", count: 12, name: "스터디" },
];

export default function ShopStatsCategoryBarGraph() {
  const maxHeight = Math.max(...categories.map((category) => category.count));

  return (
    <div className="flex items-end gap-3">
      {categories.map((category) => (
        <div key={category.key} className="flex-1">
          <div className="mb-2.5 text-center body-1 font-medium text-gray-600">{`${category.count}건`}</div>
          <div
            className={cn(
              "min-h-3 max-h-[250px] rounded-lg",
              category.count === maxHeight ? "bg-gray-600" : "bg-gray-200"
            )}
            style={{ height: `${(category.count / maxHeight) * 250}px` }}
          />
          <div className="mt-2 text-center truncate body-2 min-[1450px]:body-1 font-bold text-gray-800">
            {category.name}
          </div>
        </div>
      ))}
    </div>
  );
}
