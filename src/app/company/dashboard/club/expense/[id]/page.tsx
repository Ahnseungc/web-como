"use client";
import { getExpenseDetail } from "@/api/actions/company/expense/getExpenseDetail";
import {
  CardInfo,
  ExpenseApplicationStatus,
  ExpenseFormValues,
} from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import ApprovalButton from "@/components/dashboard/shared/molecules/ApprovalButton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RejectReasonInputModal from "@/components/dashboard/company/club/modals/RejectReasonInputModal";
import { patchApprove } from "@/api/actions/company/report/patchApprove";
import { patchReject } from "@/api/actions/company/expense/patchReject";
import { getRejectionReason } from "@/api/actions/company/expense/getRejectionReason";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>(
    searchParams.get("status") || ""
  );
  const [rejectReason, setRejectReason] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [expense, setExpense] = useState<ExpenseFormValues | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpenseDetail(Number(params.id));
      const reasonData = await getRejectionReason(Number(params.id));
      setExpense({
        eventName: data.eventName,
        description: data.description,
        note: data.note,
        location: data.location,
        participantCount: data.participantCount,
        amount: data.amount,
        details: data.details,
        file: data.file,
      });
      setCardInfo({
        clubId: data.clubId,
        clubImage: data.clubImage,
        leadersSummary: data.leadersSummary,
        activityPlan: data.activityPlan,
        memberCount: data.memberCount,
        status: data.status,
        createdAt: data.createdAt,
        clubName: data.clubName,
      });
      setStatus(data.status);
      setRejectReason(reasonData?.rejectionReason || "기타 사유");
    };
    fetchExpense();
  }, [params.id, status, rejectReason]);

  const handleStatusChange = async (
    id: number,
    newStatus: "APPROVED" | "REJECTED"
  ) => {
    if (newStatus === "APPROVED") {
      try {
        await patchApprove(id);
        setStatus("APPROVED");
      } catch (error) {
        console.error("승인 처리 실패:", error);
      }
    } else if (newStatus === "REJECTED") {
      setModalOpen(true);
    }
  };

  const handleReject = async (reason: string) => {
    try {
      setIsRejecting(true);
      await patchReject(Number(params.id), reason);
      setModalOpen(false);
      setStatus("REJECTED");
      setRejectReason(reason || "기타 사유");
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
        {status !== "REJECTED" && status !== "APPROVED" && (
          <div className="flex gap-2">
            <ApprovalButton
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(Number(params.id), "APPROVED");
              }}
              content="승인"
            />
            <ApprovalButton
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(Number(params.id), "REJECTED");
              }}
              content="반려"
            />
          </div>
        )}
      </div>
      {status === "REJECTED" && (
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
              {rejectReason}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <ClubInfoCardForExpense cardInfo={cardInfo} />
        <ExpenseReportForm expense={expense} />
      </div>
      <RejectReasonInputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onReject={handleReject}
        isRejecting={isRejecting}
      />
    </div>
  );
};

export default Page;
