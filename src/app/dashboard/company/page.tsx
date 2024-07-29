import DashboardOverview from "@/components/dashboard/company/main/molecules/Overview";
import ClubStats from "@/components/dashboard/company/main/organisms/ClubStats";
import PurchaseStats from "@/components/dashboard/company/main/organisms/PurchaseStats";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-3 w-full p-8">
      <DashboardOverview />
      <div className="flex gap-3">
        <PurchaseStats />
        <ClubStats />
      </div>
    </section>
  );
}
