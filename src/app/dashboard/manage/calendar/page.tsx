import ClubInfo from "@/components/dashboard/calendar/molecules/ClubInfo";
import ClubCalendar from "@/components/dashboard/calendar/organisms/ClubCalendar";
import NewScheduleForm from "@/components/dashboard/calendar/organisms/NewScheduleForm";

export default function CalendarPage() {
  return (
    <>
      <ClubInfo />
      <ClubCalendar />
      <NewScheduleForm />
    </>
  );
}
