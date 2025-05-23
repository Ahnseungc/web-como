"use client";
import { getExpenseDetail } from "@/api/actions/company/expense/getExpenseDetail";
import { pathApprove } from "@/api/actions/company/expense/pathApprove";
import {
  CardInfo,
  ExpenseApplicationStatus,
  ExpenseFormValues,
} from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import RejectReasonInputModal from "@/components/dashboard/company/club/modals/RejectReasonInputModal";
import ApprovalButton from "@/components/dashboard/shared/molecules/ApprovalButton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName");
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [expense, setExpense] = useState<ExpenseFormValues | null>(null);
  const [status, setStatus] = useState<ExpenseApplicationStatus | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpenseDetail(Number(params.id));
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
        clubName: clubName || "",
      });
      setStatus(data.status);
      console.log(data.status);
      setRejectReason(data.rejectReason || "");
    };
    fetchExpense();
  }, [params.id, clubName, status]);
  if (!cardInfo || !expense) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = (
    id: number,
    newStatus: "APPROVED" | "REJECTED"
  ) => {
    setStatus(newStatus);
    if (newStatus === "APPROVED") {
      pathApprove(id);
    } else if (newStatus === "REJECTED") {
      setModalOpen(true);
    }
  };

  const handleReject = async (id: number, reason: string) => {
    setStatus("REJECTED");
    setRejectReason(reason);
    setModalOpen(false);
  };

  return (
    <>
      {status === "REJECTED" && rejectReason && (
        <div className="w-full bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold">
          반려 사유: {rejectReason}
        </div>
      )}
      <div className="flex gap-2 justify-between items-center">
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
      <div className="flex gap-3">
        <ClubInfoCardForExpense cardInfo={cardInfo} />
        <ExpenseReportForm expense={expense} />
      </div>
      <RejectReasonInputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        id={Number(params.id)}
        onReject={handleReject}
      />
    </>
  );
};

export default Page;
