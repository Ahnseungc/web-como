import ReportOverview from "@/components/dashboard/club/report/molecules/ReportOverview";
import ReportList from "@/components/dashboard/club/report/organisms/ReportList";
import { getClubId } from "@/lib/cookies";

export default async function ClubReportPage() {
  const clubId = await getClubId();
  return (
    <>
      <ReportOverview clubId={clubId} />
      <ReportList clubId={clubId} />
    </>
  );
}
