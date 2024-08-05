import MemberTitle from "@/components/dashboard/club/member/molecules/MemberTitle";
import CancelApplicationModal from "@/components/dashboard/club/member/modals/CancelApplicationModal";
import MemberList from "@/components/dashboard/club/member/organisms/MemberList";
import MemberSearch from "@/components/dashboard/club/member/organisms/MemberSearch";
import NewMemberDetailModal from "@/components/dashboard/club/member/modals/NewMemberDetailModal";
import RevertCancelationModal from "@/components/dashboard/club/member/modals/RevertCancelationModal";

export default function ClubMemberPage() {
  return (
    <>
      <MemberTitle />
      <MemberSearch />
      <MemberList />
      <div className="m-0">
        <NewMemberDetailModal />
        <CancelApplicationModal />
        <RevertCancelationModal />
      </div>
    </>
  );
}
