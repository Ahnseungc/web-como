"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

import BackButton from "@/components/dashboard/common/BackButton";
import ReportDetail, {
  ReportDetailRef,
} from "@/components/dashboard/company/club/organisms/ReportDetail";
import ReportConfirmModal from "@/components/dashboard/company/club/modals/ReportConfirmModal";
import RejectReasonInputModal from "@/components/dashboard/company/club/modals/RejectReasonInputModal";
import AlertModal from "@/components/dashboard/company/club/modals/AlertModal";

import { getReportDetail } from "@/api/actions/company/report/getReportDetail";
import { getReportRejectionReason } from "@/api/actions/company/report/getReportRejectionReason";
import { patchApprove } from "@/api/actions/company/report/patchApprove";
import { patchReject } from "@/api/actions/company/report/patchReject";

import { IResponse } from "@/api/types/index";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");

  const [reportDetail, setReportDetail] = useState<IResponse | null>(null);
  const [status, setStatus] = useState(currentStatus);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const prevRejectReasonRef = useRef<string>("");
  const reportDetailRef = useRef<ReportDetailRef>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportDetail(params.id);

        // REJECTED 상태일 때만 반려 사유 API 호출
        let rejectData = null;
        if (currentStatus === "REJECTED") {
          rejectData = await getReportRejectionReason(params.id);
        }

        // API에서 null 반환 시 기존 rejectReason 유지
        const rejectionReason =
          rejectData?.rejectionReason || prevRejectReasonRef.current || "";

        setReportDetail(data);
        setRejectReason(rejectionReason);
        prevRejectReasonRef.current = rejectionReason;

        // 상태는 API에서 받은 상태 우선
        setStatus(data.data?.status || currentStatus);
      } catch (error) {
        console.error("보고서 상세 데이터 로드 실패:", error);
      }
    };

    fetchData();
  }, [params.id, currentStatus]);

  const handlePDFDownloadClick = () => {
    if (reportDetailRef.current) {
      reportDetailRef.current.handlePDFDownload();
    }
  };

  // if (!reportDetail) return <div>loading...</div>;

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
                활동 보고서
              </h2>
              <button onClick={handlePDFDownloadClick}>
                <Image
                  src="/document.png"
                  alt="report"
                  width={32}
                  height={32}
                />
              </button>
            </div>

            <div
              className={`flex space-x-3 ${status === "APPROVED" || status === "REJECTED" ? "hidden" : ""}`}
            >
              <button
                className="bg-gray-800 text-gray-0 rounded-md font-[500] px-[16px] py-[4px]"
                onClick={() => setApproveOpen(true)}
              >
                승인
              </button>
              <button
                className="border border-point-red text-point-red rounded-md font-[500] px-[16px] py-[4px]"
                onClick={() => setRejectOpen(true)}
              >
                반려
              </button>
            </div>
          </div>
        )}

        {(status === "REJECTED" || currentStatus === "REJECTED") && (
          <div className="flex items-start gap-3 bg-gray-0 rounded-xl px-6 py-5 my-4 shadow w-full min-h-[100px]">
            <div className="w-8 h-8 rounded-full bg-[#FD7E2D] text-white flex items-center justify-center font-bold text-lg shrink-0">
              !
            </div>
            <div className="flex-1">
              <div className="text-[#FD7E2D] font-bold text-base mb-1">
                반려 사유
              </div>
              <div className="text-gray-500 text-sm mb-2">
                당사의 활동지원비 규정을 검토한 결과 지원 신청이 반려되었습니다.
                재작성 부탁드립니다.
              </div>
              <div className="text-gray-900 font-medium text-base text-left">
                {rejectReason || "반려 사유를 불러오는 중..."}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <ReportDetail ref={reportDetailRef} data={reportDetail} />{" "}
      </div>
      <ReportConfirmModal
        open={approveOpen}
        type="approve"
        clubName={reportDetail?.data?.clubName || ""}
        onClose={() => setApproveOpen(false)}
        onConfirm={async () => {
          await patchApprove(params.id);
          setApproveOpen(false);

          // 승인 후 최신 데이터 다시 가져오기
          const updatedData = await getReportDetail(params.id);
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
      <RejectReasonInputModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onReject={async (reason: string) => {
          await patchReject(params.id, reason);
          setRejectOpen(false);
          setStatus("REJECTED");
          setRejectReason(reason || "기타 사유");
          prevRejectReasonRef.current = reason || "기타 사유";
          setAlertOpen(true);

          router.replace(
            `/company/dashboard/club/report/${params.id}?status=REJECTED`
          );
        }}
      />
      <AlertModal
        open={alertOpen}
        type={status || ""}
        contentType="보고서"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
