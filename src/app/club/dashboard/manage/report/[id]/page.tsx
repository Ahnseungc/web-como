"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ReportViewer from "@/components/dashboard/club/report/organisms/ReportViewer";
import ReportTitle from "@/components/dashboard/club/report/molecules/ReportTitle";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewReportForm from "@/components/dashboard/club/report/organisms/NewReportForm";
import ReportSubmitSuccessModal from "@/components/dashboard/club/report/modals/ReportSubmitSuccessModal";
import ReportCancelModal from "@/components/dashboard/club/report/modals/ReportCancelModal";

export default function ClubReportDetailPage() {
  const status = useSearchParams().get("status");
  const isPrint = status === "print";
  const hasReport = status !== "작성대기" && status !== "재요청";

  const handlePrint = () => {};

  if (isPrint) {
    handlePrint();
  }

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
      <div className="m-0">
        <ReportSubmitSuccessModal />
        <ReportCancelModal />
      </div>
    </>
  );
}
