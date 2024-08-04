import { cn } from "@/lib/utils";
import ShopCategoryCursor from "@/components/dashboard/company/main/atoms/ShopCategoryCursor";

const categories = [
  { key: "art", count: 2, name: "문화/예술", totalExpense: 150000 },
  { key: "activity", count: 6, name: "액티비티", totalExpense: 840000 },
  { key: "creative", count: 4, name: "크리에이티브", totalExpense: 680000 },
  { key: "food", count: 16, name: "F&B", totalExpense: 2600000 },
  { key: "networking", count: 8, name: "네트워킹", totalExpense: 1210000 },
  { key: "study", count: 12, name: "스터디", totalExpense: 1400000 },
];

export default function ShopStatsCategoryBarGraph() {
  const maxHeight = Math.max(...categories.map((category) => category.count));

  return (
    <>
      <ShopCategoryCursor />
      <div className="flex items-end gap-3">
        {categories.map((category) => (
          <div
            key={category.key}
            id={`${category.totalExpense.toLocaleString()}원`}
            className="flex-1 shop-category-bar"
          >
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
    </>
  );
}
