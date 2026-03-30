"use client";

import { getExpenseDetailClient } from "@/api/actions/company/expense/getExpenseDetailClient";
import {
  CardInfo,
  ExpenseApplicationStatus,
  ExpenseFormValues,
} from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm, {
  ExpenseReportFormRef,
} from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import ApprovalButton from "@/components/dashboard/shared/molecules/ApprovalButton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import ExpenseRejectReasonInputModal from "@/components/dashboard/company/club/modals/ExpenseRejectReasonInputModal";
import { patchApprove } from "@/api/actions/company/expense/patchApprove";
import { patchReject } from "@/api/actions/company/expense/patchReject";
import { getRejectionReasonClient } from "@/api/actions/company/expense/getRejectionReasonClient";
import AlertModal from "@/components/dashboard/company/club/modals/AlertModal";
import ReportConfirmModal from "@/components/dashboard/company/club/modals/ReportConfirmModal";
import { Download, Print } from "@/assets/icons/util";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const expenseFormRef = useRef<ExpenseReportFormRef>(null);
  const [status, setStatus] = useState<string>(
    searchParams.get("status") || ""
  );
  const [rejectReason, setRejectReason] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [expense, setExpense] = useState<ExpenseFormValues | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpenseDetailClient(params.id);
      const reasonData = await getRejectionReasonClient(params.id);

      setExpense({
        eventName: data.data.eventName,
        clubName: data.data.clubName,
        description: data.data.description,
        content: data.data.content,
        location: data.data.location,
        participantCount: data.data.participantCount,
        amount: data.data.amount,
        details: data.data.details,
        leadersSummary: data.data.leadersSummary,
        createdAt: data.data.createdAt,
        file: data.data.file,
      });
      setCardInfo({
        clubId: data.data.clubId,
        clubImage: data.data.clubImage,
        leadersSummary: data.data.leadersSummary,
        activityPlan: data.data.activityPlan,
        memberCount: data.data.memberCount,
        status: data.data.status,
        createdAt: data.data.createdAt,
        clubName: data.data.clubName,
      });
      setStatus(data.data.status);
      setRejectReason(reasonData?.rejectionReason || "기타 사유");
    };
    fetchExpense();
  }, [params.id, status, rejectReason]);

  // status 변경 추적
  useEffect(() => {
    console.log("status 변경됨:", status);
  }, [status]);

  const handleStatusChange = async (
    id: string,
    newStatus: "APPROVED" | "REJECTED"
  ) => {
    // console.log("handleStatusChange 호출:", { id, newStatus });
    if (newStatus === "APPROVED") {
      try {
        setIsApproving(true);
        const result = await patchApprove(id);
        setStatus("APPROVED");
      } catch (error) {
        console.error("승인 처리 실패:", error);
      } finally {
        setIsApproving(false);
      }
    } else if (newStatus === "REJECTED") {
      setModalOpen(true);
    }
  };

  const handleReject = async (reason: string) => {
    try {
      setIsRejecting(true);
      await patchReject(params.id, reason);
      setModalOpen(false);
      setStatus("REJECTED");
      setRejectReason(reason || "기타 사유");
      setAlertOpen(true);
      if (cardInfo) {
        setCardInfo({
          ...cardInfo,
          status: "REJECTED" as ExpenseApplicationStatus,
        });
      }
    } catch (error) {
      console.error("반려 처리 실패:", error);
    } finally {
      setIsRejecting(false);
    }
  };

  if (!cardInfo || !expense) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <BackButton />
        <div className="flex gap-2 items-center">
          {/* PDF 다운로드/인쇄 버튼 */}
          <button
            onClick={() => expenseFormRef.current?.handlePDFDownload()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors no-print"
          >
            <Download className="w-4 h-4" />
            PDF 다운로드
          </button>
          <button
            onClick={() => expenseFormRef.current?.handlePrint()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors no-print"
          >
            <Print className="w-4 h-4" />
            인쇄
          </button>

          {/* 승인/반려 버튼 */}
          {status !== "REJECTED" && status !== "APPROVED" && (
            <>
              <ApprovalButton
                onClick={() => {
                  setApproveOpen(true);
                }}
                content="승인"
              />
              <ApprovalButton
                onClick={() => {
                  setModalOpen(true);
                }}
                content="반려"
              />
            </>
          )}
        </div>
      </div>
      {status === "REJECTED" && (
        <div className="flex items-start gap-3 bg-gray-0 rounded-xl px-6 py-5 my-4 shadow w-full min-h-[100px]">
          <div className="w-8 h-8 rounded-full bg-[#FD7E2D] text-white flex items-center justify-center font-bold text-lg mr-2 shrink-0">
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
              {rejectReason}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-3 items-start">
        <ClubInfoCardForExpense cardInfo={cardInfo} />
        <ExpenseReportForm ref={expenseFormRef} expense={expense} />
      </div>
      <ExpenseRejectReasonInputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onReject={handleReject}
        isRejecting={isRejecting}
      />
      <AlertModal
        open={alertOpen}
        type={status || ""}
        contentType="지원서"
        onClose={() => setAlertOpen(false)}
      />

      <ReportConfirmModal
        open={approveOpen}
        type="approve"
        clubName={cardInfo.clubName}
        onClose={() => {
          setApproveOpen(false);
        }}
        onConfirm={async () => {
          await handleStatusChange(params.id, "APPROVED");
          setApproveOpen(false);
          setAlertOpen(true);
        }}
        isProcessing={isApproving}
      />
    </div>
  );
};

export default Page;
