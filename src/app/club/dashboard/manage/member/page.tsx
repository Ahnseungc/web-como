import MemberTitle from "@/components/dashboard/club/member/molecules/MemberTitle";
import MemberList from "@/components/dashboard/club/member/organisms/MemberList";
import { getClubId } from "@/lib/cookies";

export default async function ClubMemberPage() {
  const clubId = await getClubId();
  console.log(clubId);
  return (
    <>
      <MemberTitle />
      {/* <MemberSearch /> */}
      <MemberList clubId={clubId} />
    </>
  );
}
// 동호회 임원 - 동호회 회원 관리 페이지
