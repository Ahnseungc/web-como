import DashboardOverview from "@/components/dashboard/molecules/Overview";
import DashboardTransaction from "@/components/dashboard/molecules/Transaction";
import DashboardCalendarShortcut from "@/components/dashboard/molecules/CalendarShortcut";
import DashboardSchedule from "@/components/dashboard/molecules/Schedule";
import DashboardUpcomingDue from "@/components/dashboard/molecules/UpcomingDue";
import DashboardRanking from "@/components/dashboard/molecules/Ranking";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_390px)] auto-rows-min gap-3 w-full p-[38px]">
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
    </div>
  );
}
