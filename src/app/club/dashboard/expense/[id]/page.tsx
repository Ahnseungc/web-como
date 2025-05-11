"use client";
import { getExpenseDetail } from "@/api/actions/company/expense/getExpenseDetail";
import { CardInfo, ExpenseFormValues } from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getClubId } from "@/lib/cookies";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName");
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [expense, setExpense] = useState<ExpenseFormValues | null>(null);
  const [clubId, setClubId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClubId = async () => {
      try {
        const data = await getClubId();
        setClubId(Number(data) || null);
      } catch (error) {
        console.error("클럽 ID를 가져오는 중 오류 발생:", error);
      }
    };
    fetchClubId();
  }, []);

  useEffect(() => {
    const fetchExpense = async () => {
      if (clubId) {
      const data = await getExpenseDetail(Number(params.id), Number(clubId));
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
      }
    };
    fetchExpense();
  }, [params.id, clubName, clubId]);
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
