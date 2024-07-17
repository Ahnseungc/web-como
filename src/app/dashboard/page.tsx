import DashboardOverview from "@/components/dashboard/main/molecules/Overview";
import DashboardTransaction from "@/components/dashboard/main/molecules/Transaction";
import DashboardCalendarShortcut from "@/components/dashboard/main/molecules/CalendarShortcut";
import DashboardSchedule from "@/components/dashboard/main/molecules/Schedule";
import DashboardUpcomingDue from "@/components/dashboard/main/molecules/UpcomingDue";
import DashboardRanking from "@/components/dashboard/main/molecules/Ranking";

export default function DashboardPage() {
  return (
    <section className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_390px)] auto-rows-min gap-3 w-full p-8">
      <DashboardOverview />
      <div className="col-span-3 flex flex-col gap-3">
        <DashboardTransaction />
        <DashboardSchedule />
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <DashboardCalendarShortcut />
        <DashboardUpcomingDue />
        <DashboardRanking />
      </div>
    </section>
  );
}
