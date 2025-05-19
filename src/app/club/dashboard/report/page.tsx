import ReportOverview from "@/components/dashboard/club/report/molecules/ReportOverview";
import ReportList from "@/components/dashboard/club/report/organisms/ReportList";
import { getClubId } from "@/lib/cookies";

export default async function ClubReportPage() {
  const clubId = await getClubId();
  return (
    <>
      {" "}
      <div className=" p-8 rounded-2xl bg-gray-0 flex flex-col gap-[8px] ">
        <span className=" text-point-brightBlue h2 font-bold">
          활동보고서 기능 안내
        </span>
        <span className=" text-gray-900">
          동호회 활동 보고서 기능은 05/09 14:00 부터 사용 가능합니다.
        </span>
      </div>
      <ReportOverview clubId={clubId} />
      <ReportList clubId={clubId} />
    </>
  );
}
