import MemberTitle from "@/components/dashboard/member/molecules/MemberTitle";
import CancelApplicationModal from "@/components/dashboard/member/organisms/CancelApplicationModal";
import MemberList from "@/components/dashboard/member/organisms/MemberList";
import MemberSearch from "@/components/dashboard/member/organisms/MemberSearch";
import NewMemberDetailModal from "@/components/dashboard/member/organisms/NewMemberDetailModal";
import RevertCancelationModal from "@/components/dashboard/member/organisms/RevertCancelationModal";

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
