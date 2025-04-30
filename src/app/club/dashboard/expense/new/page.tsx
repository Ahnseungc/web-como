import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewExpenseReportForm from "@/components/dashboard/club/expense/organisms/NewExpenseForm";
import { getData } from "@/api/action";
import { getAccessToken, getClubId, getClubName } from "@/lib/cookies";

export default async function NewExpenseReportPage() {
  const clubName = await getClubName();
  const accessToken = await getAccessToken();
  const clubId = await getClubId()

  console.log(clubName);

  return (
    <>
      <BackButton />

      <div className="flex gap-3">
        <ClubInfoCard />
        <NewExpenseReportForm clubName={clubName} accessToken={accessToken} clubId={clubId} />
      </div>
    </>
  );
}
