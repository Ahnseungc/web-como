import { ReportCounts } from "./ReportCounts";

interface Props {
  clubId: string | undefined;
}

export default async function ReportOverview({ clubId }: Props) {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">보고서 관리</h2>
      <ReportCounts clubId={clubId} />
    </div>
  );
}
