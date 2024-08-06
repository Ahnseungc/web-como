import ClubInfo from "@/components/dashboard/club/calendar/molecules/ClubInfo";
import ClubCalendar from "@/components/dashboard/shared/organisms/ClubCalendar";
import NewScheduleFormModal from "@/components/dashboard/club/calendar/modals/NewScheduleFormModal";

export default function CalendarPage() {
  return (
    <>
      <ClubInfo />
      <ClubCalendar />
      <div className="m-0">
        <NewScheduleFormModal />
      </div>
    </>
  );
}
