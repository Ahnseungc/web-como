"use client";

import { usePathname, useRouter } from "next/navigation";
import { PrintButton } from "@/components/dashboard/common/DocUtil";
import {
  cn,
  formatDate,
  formatDateArray,
  formatDateFlexible,
} from "@/lib/utils";

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

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [activityDetail, setActivityDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleAfterPrint = () => {
    // console.log("인쇄 완료 또는 취소. 상태를 초기화합니다.");
    setActivityDetail(null);
    setSelectedActivity(null);
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: activityDetail?.eventName || "활동보고서",
    onAfterPrint: handleAfterPrint,
  });

  useEffect(() => {
    if (activityDetail && !isLoading && contentRef.current) {
      const timer = setTimeout(() => {
        console.log("상세 데이터 렌더링 준비 완료. 인쇄를 시작합니다.");
        handlePrint();
      }, 100);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityDetail, isLoading]);

  const handlePrintClick = async (activity: Activity) => {
    if (isLoading) return;

    console.log(`인쇄 버튼 클릭: Activity ID - ${activity.id}`);
    setIsLoading(true);
    setSelectedActivity(activity);
    setActivityDetail(null);

    try {
      const detail = await getReportDetail(activity.id.toString());
      console.log("전체 API 응답 데이터:", detail);

      if (detail && detail.data) {
        setActivityDetail(detail.data);
      } else {
        console.error(
          "상세 데이터를 받아오지 못했습니다. API 응답에 'data' 속성이 없습니다."
        );
        alert("보고서 상세 정보를 불러오는 데 실패했습니다.");
        setSelectedActivity(null);
      }
    } catch (error) {
      console.error("상세 데이터 조회 중 에러 발생:", error);
      alert("보고서 상세 정보를 불러오는 중 오류가 발생했습니다.");
      setSelectedActivity(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (!activities) return <div>loading...</div>;

  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        {/* 테이블 헤더 */}
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
        {/* 테이블 바디 */}
        {activities.map((activity: Activity, idx: number) => (
          <li
            key={activity.id}
            className="flex border-b border-gray-400 bg-gray-0 w-full"
          >
            <div className="flex-[0.5] min-w-[48px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {formatDateFlexible(activity.createdAt)}
            </div>
            <div className="flex-[2] min-w-[180px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {activity.clubName}
            </div>
            <div
              className="flex-[2] min-w-[250px] my-3 mx-6 body-1 font-medium text-left hover:decoration-gray-800 cursor-pointer underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300 text-gray-800"
              onClick={() =>
                push(`${pathname}/${activity.id}?status=${activity.status}`)
              }
            >
              {activity.eventName}
            </div>
            <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
              {formatDate(new Date(activity.activityDate))}
            </div>
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
            <div className="flex-[0.7] min-w-[60px] flex items-center justify-center gap-2 m-0 my-3 mx-6">
              {activity.status === "PENDING" ? (
                "-"
              ) : (
                <button
                  onClick={() => handlePrintClick(activity)}
                  disabled={isLoading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && selectedActivity?.id === activity.id ? (
                    <span className="text-sm">로딩중...</span>
                  ) : (
                    <PrintButton />
                  )}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 인쇄용 숨겨진 영역 */}
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          {activityDetail && <ReportDetailPrint data={activityDetail} />}
        </div>
      </div>
    </>
  );
}
