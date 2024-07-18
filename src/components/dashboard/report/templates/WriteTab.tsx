import ClubInfoCard from "@/components/dashboard/common/ClubInfoCard";
import NewReportForm from "@/components/dashboard/report/organisms/NewReportForm";

export default function ReportWriteTab() {
  return (
    <div className="flex space-x-3">
      <ClubInfoCard />
      <NewReportForm />
    </div>
  );
}
