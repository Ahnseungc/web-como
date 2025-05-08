"use client";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams } from "next/navigation";
import ReportDetail from "@/components/dashboard/company/club/organisms/ReportDetail";
import { useEffect, useState } from "react";
import { getReportDetail } from "@/api/actions/company/report/getReportDetail";
import { ActivityReportDetail } from "@/api/types/company/report";

export default function Page({ params }: { params: { id: string } }) {
  const status = useSearchParams().get("status");
  const isPrint = status === "print";
  const [reportDetail, setReportDetail] = useState<ActivityReportDetail | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getReportDetail(Number(params.id));
      setReportDetail(data);
    };
    fetchData();
  }, [params.id]);
  if (!reportDetail) return <div>loading...</div>;
  return (
    <>
      <BackButton />
      <div className="space-y-2 p-8 rounded-xl bg-gray-0">
        <h2 className="font-bold text-gray-900">{"활동 보고서"}</h2>
      </div>
      <div className="flex space-x-3">
        <ReportDetail data={reportDetail} />
      </div>
    </>
  );
}
