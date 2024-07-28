import ClubInfo from "@/components/dashboard/club/calendar/molecules/ClubInfo";
import ClubCalendar from "@/components/dashboard/club/calendar/organisms/ClubCalendar";
import NewScheduleForm from "@/components/dashboard/club/calendar/organisms/NewScheduleForm";

export default function CalendarPage() {
  return (
    <>
      <ClubInfo />
      <ClubCalendar />
      <NewScheduleForm />
    </>
  );
}
