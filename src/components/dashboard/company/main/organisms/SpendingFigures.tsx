import ExpanseTotalSpending from "@/components/dashboard/company/main/molecules/ExpanseTotalSpending";
import TotalSpending from "@/components/dashboard/company/main/molecules/TotalSpending";

export default function SpendingFigures() {
  return (
    <div className="flex gap-3">
      <ExpanseTotalSpending />
      <TotalSpending />
    </div>
  );
}
