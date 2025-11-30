"use client";

import { usePathname, useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ReportViewer from "@/components/dashboard/club/report/organisms/ReportViewer";
import ReportTitle from "@/components/dashboard/club/report/molecules/ReportTitle";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewReportForm from "@/components/dashboard/club/report/organisms/NewReportForm";
import ReportSubmitSuccessModal from "@/components/dashboard/club/report/modals/ReportSubmitSuccessModal";
import ReportCancelModal from "@/components/dashboard/club/report/modals/ReportCancelModal";
import { useQuery } from "@tanstack/react-query";
// import { getData } from "@/api/action";
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
  issuedDate: [number, number, number]; // [year, month, day]
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
  const status = useSearchParams().get("status");
  const clubId = useSearchParams().get("clubId");
  const isPrint = status === "print";
  // const hasReport = status !== "작성대기" && status !== "재요청";
  const pathname = usePathname();
  const reportId = pathname.split("/").pop();

  // const handlePrint = () => {};

  // if (isPrint) {
  //   handlePrint();
  // }

  const { data: reportDetail } = useQuery({
    queryKey: [clubId, reportId, "reportDetail"],
    queryFn: () => getData(`v1/executive/club/${clubId}/reports/${reportId}`),
  });

  const data = reportDetail?.data as ClubData;

  return (
    <>
      <BackButton />
      {/* {hasReport ? (
        <ReportViewer />
      ) : ( */}
      <>
        <div className="space-y-2 p-8 rounded-xl bg-gray-0">
          <h2 className="font-bold text-gray-900">{"활동 보고서"}</h2>
        </div>
        {/* <ReportTitle /> */}
        <div className="flex space-x-3">
          {/* <ClubInfoCard /> */}
          {/* <NewReportForm /> */}
          <ReportDetail data={data} />
        </div>
      </>
      {/* )} */}
      <div className="m-0">
        {/* <ReportSubmitSuccessModal /> */}
        {/* <ReportCancelModal /> */}
      </div>
    </>
  );
}
