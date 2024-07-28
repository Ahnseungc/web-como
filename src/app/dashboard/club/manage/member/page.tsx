import MemberTitle from "@/components/dashboard/club/member/molecules/MemberTitle";
import CancelApplicationModal from "@/components/dashboard/club/member/organisms/CancelApplicationModal";
import MemberList from "@/components/dashboard/club/member/organisms/MemberList";
import MemberSearch from "@/components/dashboard/club/member/organisms/MemberSearch";
import NewMemberDetailModal from "@/components/dashboard/club/member/organisms/NewMemberDetailModal";
import RevertCancelationModal from "@/components/dashboard/club/member/organisms/RevertCancelationModal";

export default function ClubMemberPage() {
  return (
    <>
      <MemberTitle />
      <MemberSearch />
      <MemberList />
      <NewMemberDetailModal />
      <CancelApplicationModal />
      <RevertCancelationModal />
    </>
  );
}
