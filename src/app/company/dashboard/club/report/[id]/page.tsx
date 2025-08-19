"use client";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams, useRouter } from "next/navigation";
import ReportDetail from "@/components/dashboard/company/club/organisms/ReportDetail";
import { useEffect, useState, useRef } from "react";
import { getReportDetail } from "@/api/actions/company/report/getReportDetail";
import { ActivityReportDetail } from "@/api/types/company/report";
import { IResponse } from "@/api/types/index";
import Image from "next/image";
import ReportConfirmModal from "@/components/dashboard/company/club/modals/ReportConfirmModal";
import { patchApprove } from "@/api/actions/company/report/patchApprove";
import { patchReject } from "@/api/actions/company/report/patchReject";
import RejectReasonInputModal from "@/components/dashboard/company/club/modals/RejectReasonInputModal";
import { getReportRejectionReason } from "@/api/actions/company/report/getReportRejectionReason";
import AlertModal from "@/components/dashboard/company/club/modals/AlertModal";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");
  const [reportDetail, setReportDetail] = useState<IResponse | null>(null);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const prevRejectReasonRef = useRef<string>("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("=== useEffect 실행 ===");
      console.log("params.id:", params.id);
      console.log("currentStatus:", currentStatus);

      const data = await getReportDetail(params.id);

      // REJECTED 상태일 때만 반려 사유 API 호출
      let rejectData = null;
      if (currentStatus === "REJECTED") {
        rejectData = await getReportRejectionReason(params.id);
      }

      console.log("=== 보고서 상세 데이터 확인 ===");
      console.log("전체 data:", data);
      console.log("data.data:", data.data);
      console.log("data.data의 모든 키:", Object.keys(data.data || {}));
      console.log("data.data의 모든 값:", Object.values(data.data || {}));
      console.log("=============================");

      if (rejectData) {
        console.log("=== 반려 사유 데이터 확인 ===");
        console.log("rejectData:", rejectData);
        console.log("rejectData.rejectionReason:", rejectData.rejectionReason);
        console.log("=============================");
      }

      // 반려 사유 설정 - API에서 null이면 기존 상태 유지
      const rejectionReason = rejectData?.rejectionReason || "";
      console.log("최종 사용할 rejectionReason:", rejectionReason);

      setReportDetail(data);

      // API에서 null이면 기존 rejectReason 유지 (로컬 상태 보존)
      if (
        currentStatus === "REJECTED" &&
        !rejectionReason &&
        prevRejectReasonRef.current
      ) {
        console.log(
          "API에서 null 반환, 기존 rejectReason 유지:",
          prevRejectReasonRef.current
        );
      } else {
        setRejectReason(rejectionReason);
      }

      setStatus(currentStatus);

      // 현재 rejectReason을 ref에 저장
      prevRejectReasonRef.current = rejectReason;

      console.log("=== 상태 설정 완료 ===");
      console.log("설정된 rejectionReason:", rejectionReason);
      console.log("설정된 status:", currentStatus);
      console.log("=========================");
    };
    fetchData();
  }, [params.id, currentStatus]);
  if (!reportDetail) return <div>loading...</div>;
  return (
    <>
      <div className="no-print">
        <BackButton />
        {status !== "REJECTED" && (
          <div className="p-8 rounded-xl bg-gray-0 flex justify-between items-center mt-4">
            <div
              className={`flex items-center gap-[12px] ${
                status === "APPROVED" || status === "REJECTED"
                  ? "justify-between w-full"
                  : ""
              }`}
            >
              <h2 className="font-bold text-gray-900 text-[20px]">
                {"활동 보고서"}
              </h2>
              <button className="" onClick={() => window.print()}>
                <Image
                  src={"/document.png"}
                  alt="report"
                  width={32}
                  height={32}
                />
              </button>
            </div>
            <div
              className={`flex space-x-3 ${
                status === "APPROVED" || status === "REJECTED" ? "hidden" : ""
              }`}
            >
              <button
                className="bg-gray-800 text-gray-0 rounded-md font-[500] font-suit px-[16px] py-[4px]"
                onClick={() => {
                  setApproveOpen(true);
                }}
              >
                승인
              </button>
              <button
                className="border border-point-red text-point-red rounded-md font-[500] font-suit px-[16px] py-[4px]"
                onClick={() => {
                  setRejectOpen(true);
                }}
              >
                반려
              </button>
            </div>
          </div>
        )}
        {(status === "REJECTED" || currentStatus === "REJECTED") && (
          <div className="flex items-start gap-3 bg-gray-0 rounded-xl px-6 py-5 my-4 shadow w-full min-h-[100px]">
            {/* 아이콘 */}
            <div className="w-8 h-8 rounded-full bg-[#FD7E2D] text-white flex items-center justify-center font-bold text-lg mr-2 shrink-0">
              !
            </div>
            {/* 내용 */}
            <div className="flex-1">
              <div className="text-[#FD7E2D] font-bold text-base mb-1">
                반려 사유
              </div>
              <div className="text-gray-500 text-sm mb-2">
                당사의 활동지원비 규정을 검토한 결과 지원 신청이 반려되었습니다.
                재작성 부탁드립니다.
              </div>
              <div className="text-gray-900 font-medium text-base text-left">
                {(() => {
                  console.log("=== 반려 사유 표시 ===");
                  console.log("status:", status);
                  console.log("currentStatus:", currentStatus);
                  console.log("rejectReason:", rejectReason);
                  console.log("=====================");
                  return rejectReason || "반려 사유를 불러오는 중...";
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <ReportDetail data={reportDetail} />
      </div>
      <ReportConfirmModal
        open={approveOpen}
        type="approve"
        clubName={reportDetail?.data?.clubName || ""}
        onClose={() => {
          setApproveOpen(false);
        }}
        onConfirm={async () => {
          console.log("=== Report 승인 처리 시작 ===");
          console.log("reportId:", params.id);
          console.log("=========================");
          await patchApprove(params.id);
          setApproveOpen(false);

          // 승인 후 최신 데이터 다시 가져오기
          const updatedData = await getReportDetail(params.id);
          console.log("승인 후 업데이트된 데이터:", updatedData);
          setReportDetail(updatedData);
          const newStatus = updatedData.data?.status || "APPROVED";
          setStatus(newStatus);

          // URL 업데이트
          router.replace(
            `/company/dashboard/club/report/${params.id}?status=${newStatus}`
          );
          setAlertOpen(true);
        }}
      />
      <AlertModal
        open={alertOpen}
        type={status || ""}
        contentType="보고서"
        onClose={() => setAlertOpen(false)}
      />

      <RejectReasonInputModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onReject={async (reason: string) => {
          console.log("=== Report 반려 처리 시작 ===");
          console.log("전송할 reason:", reason);
          console.log("reportId:", params.id);
          console.log("=========================");

          await patchReject(params.id, reason);
          setRejectOpen(false);
          setStatus("REJECTED");
          setRejectReason(reason || "기타 사유");
          setAlertOpen(true);

          // URL 업데이트
          router.replace(
            `/company/dashboard/club/report/${params.id}?status=REJECTED`
          );
        }}
      />
    </>
  );
}
