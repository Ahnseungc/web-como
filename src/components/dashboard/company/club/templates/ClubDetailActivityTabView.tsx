import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubDetailActivityOverview from "@/components/dashboard/company/club/molecules/ClubDetailActivityOverview";
import ClubCalendar from "@/components/dashboard/shared/organisms/ClubCalendar";

export default function ClubDetailActivityTabView() {
  return (
    <>
      <ClubTitle />
      <ClubDetailActivityOverview />
      <ClubCalendar readonly />
    </>
  );
}
