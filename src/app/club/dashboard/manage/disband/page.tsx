import ClubList from "@/components/dashboard/club/disband/organisms/ClubList";
import DisbandClubModal from "@/components/dashboard/club/disband/organisms/DisbandClubModal";
import DisbandClubFormModal from "@/components/dashboard/club/disband/organisms/DisbandClubFormModal";

export default function ClubDisbandPage() {
  return (
    <>
      <ClubList />
      <DisbandClubModal />
      <DisbandClubFormModal />
    </>
  );
}
