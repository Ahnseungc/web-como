import DashboardOverview from "@/components/dashboard/company/main/molecules/Overview";
import PurchaseStats from "@/components/dashboard/company/main/organisms/PurchaseStats";
import ClubStats from "@/components/dashboard/company/main/organisms/ClubStats";
import EmployeeClubFigures from "@/components/dashboard/company/main/organisms/EmployeeClubFigures";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-3 w-full p-8">
      <DashboardOverview />
      <div className="flex gap-3">
        <PurchaseStats />
        <ClubStats />
      </div>
      <EmployeeClubFigures />
    </section>
  );
}
