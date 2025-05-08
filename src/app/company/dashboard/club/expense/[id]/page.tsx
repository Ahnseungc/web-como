"use client";
import { getExpenseDetail } from "@/api/actions/company/expense/getExpenseDetail";
import { CardInfo, ExpenseFormValues } from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName");
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [expense, setExpense] = useState<ExpenseFormValues | null>(null);
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
    };
    fetchExpense();
  }, [params.id, clubName]);
  if (!cardInfo || !expense) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCardForExpense cardInfo={cardInfo} />
        <ExpenseReportForm expense={expense} />
      </div>
    </>
  );
};

export default Page;
