import MemberTitle from "@/components/dashboard/member/molecules/MemberTitle";
import MemberList from "@/components/dashboard/member/organisms/MemberList";
import MemberSearch from "@/components/dashboard/member/organisms/MemberSearch";

export default function ClubMemberPage() {
  return (
    <>
      <MemberTitle />
      <MemberSearch />
      <MemberList />
    </>
  );
}
