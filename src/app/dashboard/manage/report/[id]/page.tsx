"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ReportViewer from "@/components/dashboard/report/organisms/ReportViewer";
import ReportTitle from "@/components/dashboard/report/molecules/ReportTitle";
import ClubInfoCard from "@/components/dashboard/common/ClubInfoCard";
import NewReportForm from "@/components/dashboard/report/organisms/NewReportForm";

export default function ClubReportDetailPage() {
  const status = useSearchParams().get("status");
  const hasReport = status !== "작성대기" && status !== "재요청";

  return (
    <>
      <BackButton />
      {hasReport ? (
        <ReportViewer />
      ) : (
        <>
          <ReportTitle />
          <div className="flex space-x-3">
            <ClubInfoCard />
            <NewReportForm />
          </div>
        </>
      )}
    </>
  );
}
