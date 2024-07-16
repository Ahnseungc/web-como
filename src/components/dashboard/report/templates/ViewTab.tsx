"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ReportViewer from "@/components/dashboard/report/organisms/ReportViewer";
import ReportOverview from "@/components/dashboard/report/organisms/ReportOverview";
import ReportList from "@/components/dashboard/report/organisms/ReportList";

export default function ReportViewTab() {
  const report = useSearchParams().get("report");

  return (
    <>
      {report ? (
        <>
          <BackButton />
          <ReportViewer />
        </>
      ) : (
        <>
          <ReportOverview />
          <ReportList />
        </>
      )}
    </>
  );
}
