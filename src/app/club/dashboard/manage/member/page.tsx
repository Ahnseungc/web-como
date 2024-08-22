import MemberTitle from "@/components/dashboard/club/member/molecules/MemberTitle";
import MemberSearch from "@/components/dashboard/club/member/organisms/MemberSearch";
import MemberList from "@/components/dashboard/club/member/organisms/MemberList";

export default function ClubMemberPage() {
  return (
    <>
      <MemberTitle />
      <MemberSearch />
      <MemberList />
    </>
  );
}
