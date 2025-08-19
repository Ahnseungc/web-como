"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  cn,
  formatDate,
  formatDateArray,
  formatDateFlexible,
} from "@/lib/utils";
import { PrintButton } from "@/components/dashboard/common/DocUtil";
import { Activity } from "@/api/types/company/report";
import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { getReportDetail } from "@/api/actions/company/report/getReportDetail";
import ReportDetailPrint from "../organisms/ReportDetailPrint";

interface Props {
  activities: Activity[];
}

export default function ReportTable({ activities }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  // 디버깅을 위한 로그 추가
  console.log("ReportTable activities:", activities);
  if (activities && activities.length > 0) {
    console.log("First activity createdDate:", activities[0].createdDate);
    console.log("createdDate type:", typeof activities[0].createdDate);
    console.log(
      "createdDate isArray:",
      Array.isArray(activities[0].createdDate)
    );
  }
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [activityDetail, setActivityDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    contentRef: contentRef,
    documentTitle: selectedActivity?.eventName || "활동보고서",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  } as any);

  useEffect(() => {
    if (activityDetail && selectedActivity) {
      handlePrint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityDetail, selectedActivity]);

  const handlePrintClick = async (activity: Activity) => {
    setSelectedActivity(activity);
    setIsLoading(true);
    try {
      const detail = await getReportDetail(activity.id.toString());
      setActivityDetail(detail);
    } catch (error) {
      console.error("상세 데이터 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!activities) return <div>loading...</div>;
  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        <li className="flex border-y border-gray-400 bg-gray-200 w-full">
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[0.5] min-w-[48px] text-center">
            순번
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[100px] text-center">
            작성 일자
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[2] min-w-[180px] text-center">
            동호회명
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[2] min-w-[250px] text-left">
            활동명
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[100px] text-center">
            활동일
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[80px] text-center">
            확인 상태
          </div>
          <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[0.7] min-w-[60px] flex items-center justify-center m-0">
            인쇄
          </div>
        </li>
        {activities.map((activity: Activity, idx: number) => (
          <li
            key={activity.id}
            className="flex border-b border-gray-400 bg-gray-0 w-full"
          >
            {/* 순번 */}
            <div className="flex-[0.5] min-w-[48px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {idx + 1}
            </div>
            {/* 작성 일자 */}
            <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {formatDateFlexible(activity.createdDate)}
            </div>
            {/* 동호회명 */}
            <div className="flex-[2] min-w-[180px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {activity.clubName}
            </div>
            {/* 활동명 */}
            <div
              className="flex-[2] min-w-[250px] my-3 mx-6 body-1 font-medium text-left hover:decoration-gray-800 cursor-pointer underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300 text-gray-800"
              onClick={() =>
                push(`${pathname}/${activity.id}?status=${activity.status}`)
              }
            >
              {activity.eventName}
            </div>
            {/* 활동일 */}
            <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {formatDate(new Date(activity.activityDate))}
            </div>
            {/* 확인 상태 */}
            <div
              className={cn(
                "flex-1 min-w-[80px] my-3 mx-6 body-1 font-medium text-center",
                activity.status === "PENDING"
                  ? "text-gray-500"
                  : activity.status === "REJECTED"
                    ? "text-point-red"
                    : "text-point-blue"
              )}
            >
              {activity.status === "PENDING"
                ? "미확인"
                : activity.status === "REJECTED"
                  ? "반려"
                  : activity.status === "APPROVED"
                    ? "승인"
                    : "-"}
            </div>
            {/* 인쇄 */}
            <div className="flex-[0.7] min-w-[60px] flex items-center justify-center gap-2 m-0 my-3 mx-6">
              {activity.status === "PENDING" ? (
                "-"
              ) : (
                <button
                  //onClick={() => handlePrintClick(activity)}
                  disabled={isLoading}
                  className="disabled:opacity-50"
                >
                  <PrintButton />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 인쇄용 숨겨진 영역 */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={contentRef}>
          {activityDetail && <ReportDetailPrint data={activityDetail} />}
        </div>
      </div>
    </>
  );
}
