"use client";

import { CardInfo, ExpenseFormValues } from "@/api/types/company/expense";
import ClubInfoCardForExpense from "@/components/dashboard/club/expense/organisms/ClubInfoCardForExpense";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import { useSearchParams } from "next/navigation";
import { getClubId, getData } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName");
  const clubId = getClubId();

  const { data, isLoading } = useQuery({
    queryKey: ["expense", clubId, params.id],
    queryFn: () =>
      getData(
        `v1/executive/club/${clubId}/activity-expense/${params.id}`,
        true
      ).then((res) => res.data),
    enabled: !!clubId,
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const expense: ExpenseFormValues = {
    eventName: data.eventName,
    description: data.description,
    clubName: data.clubName,
    content: data.content,
    location: data.location,
    participantCount: data.participantCount,
    leadersSummary: data.leadersSummary,
    amount: data.amount,
    details: data.details,
    createdAt: data.createdAt,
    file: data.file,
  };

  const cardInfo: CardInfo = {
    clubId: data.clubId,
    clubImage: data.clubImage,
    leadersSummary: data.leadersSummary,
    activityPlan: data.activityPlan,
    memberCount: data.memberCount,
    status: data.status,
    createdAt: data.createdAt,
    clubName: clubName || "",
  };

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
