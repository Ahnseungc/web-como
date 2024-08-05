import ClubList from "@/components/dashboard/club/disband/organisms/ClubList";
import DisbandClubModal from "@/components/dashboard/club/disband/modals/DisbandClubModal";
import DisbandClubFormModal from "@/components/dashboard/club/disband/modals/DisbandClubFormModal";

export default function ClubDisbandPage() {
  return (
    <>
      <ClubList />
      <div className="m-0">
        <DisbandClubModal />
        <DisbandClubFormModal />
      </div>
    </>
  );
}
