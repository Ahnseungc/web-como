import ClubDetailInfo from "@/components/dashboard/company/club/organisms/ClubDetailInfo";
import ClubMemberList from "@/components/dashboard/company/club/organisms/ClubMemberList";
import { useParams } from "next/navigation";

export default function ClubDetailAboutTabView() {
  const params = useParams();
  const clubId = params.id as string;

  return (
    <>
      <ClubDetailInfo clubId={clubId} />
      <ClubMemberList />
    </>
  );
}
