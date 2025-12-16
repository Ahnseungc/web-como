"use client";

import { usePathname, useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import ReportDetail from "@/components/dashboard/club/report/organisms/ReportDetail";

interface Photo {
  id: number;
  url: string;
}

interface Expense {
  category: string;
  supportAmount: number;
  usedAmount: number;
  remainingAmount: number;
  usageDetail: string;
  submittedBy: string;
  issuedDate: [number, number, number];
  vendor: string;
  amount: number;
  description: string;
  file: string;
}

interface ClubData {
  clubImage: string;
  clubName: string;
  writerName: string;
  writerRole: string;
  writerDepartment: string;
  eventName: string;
  activityDate: [number, number, number]; // [year, month, day]
  activityTime: [number, number]; // [hour, minute]
  location: string;
  locationDetail: string;
  participantCount: number;
  activityContent: string;
  note: string;
  photos: Photo[];
  expenses: Expense[];
}

interface Props {
  data: ClubData;
}

export default function ClubReportDetailPage() {
  const clubId = useSearchParams().get("clubId");
  const pathname = usePathname();
  const reportId = pathname.split("/").pop();

  const { data: reportDetail } = useQuery({
    queryKey: [clubId, reportId, "reportDetail"],
    queryFn: () => getData(`v1/executive/club/${clubId}/reports/${reportId}`),
  });

  const data = reportDetail?.data as ClubData;

  return (
    <>
      <BackButton />
      <>
        <div className="space-y-2 p-8 rounded-xl bg-gray-0">
          <h2 className="font-bold text-gray-900">활동 보고서</h2>
        </div>

        <div className="flex space-x-3">
          <ReportDetail data={data} />
        </div>
      </>
    </>
  );
}
