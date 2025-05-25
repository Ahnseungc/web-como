"use client";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams } from "next/navigation";
import ReportDetail from "@/components/dashboard/company/club/organisms/ReportDetail";
import { useEffect, useState } from "react";
import { getReportDetail } from "@/api/actions/company/report/getReportDetail";
import { ActivityReportDetail } from "@/api/types/company/report";
import Image from "next/image";
import ReportConfirmModal from "@/components/dashboard/company/club/modals/ReportConfirmModal";
import { patchApprove } from "@/api/actions/company/report/patchApprove";
import { patchReject } from "@/api/actions/company/report/patchReject";

export default function Page({ params }: { params: { id: string } }) {
  const initialStatus = useSearchParams().get("status");
  const [reportDetail, setReportDetail] = useState<ActivityReportDetail | null>(
    null
  );
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus);

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
      <div className="no-print">
        <BackButton />
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
      </div>

      <div className="flex space-x-3">
        <ReportDetail data={reportDetail} />
      </div>
      <ReportConfirmModal
        open={approveOpen}
        type="approve"
        clubName={reportDetail.clubName}
        onClose={() => setApproveOpen(false)}
        onConfirm={async () => {
          await patchApprove(Number(params.id));
          setApproveOpen(false);
          setStatus("APPROVED");
        }}
      />
      <ReportConfirmModal
        open={rejectOpen}
        type="reject"
        clubName={reportDetail.clubName}
        onClose={() => setRejectOpen(false)}
        onConfirm={async () => {
          await patchReject(Number(params.id));
          setRejectOpen(false);
          setStatus("REJECTED");
        }}
      />
    </>
  );
}
