"use client";

import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewExpenseReportForm from "@/components/dashboard/club/expense/organisms/NewExpenseForm";
import { getAccessToken, getClubId, getClubName } from "@/lib/client-utils";

export default function NewExpenseReportPage() {
  const clubName = getClubName();
  const accessToken = getAccessToken();
  const clubId = getClubId();

  return (
    <>
      <BackButton />

      <div className="flex gap-3">
        <ClubInfoCard />
        <NewExpenseReportForm
          clubName={clubName}
          accessToken={accessToken}
          clubId={clubId}
        />
      </div>
    </>
  );
}
