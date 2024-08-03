import ClubList from "@/components/dashboard/club/remove/organisms/ClubList";
import DisbandClubFormModal from "@/components/dashboard/club/remove/organisms/DisbandClubFormModal";
import DisbandClubModal from "@/components/dashboard/club/remove/organisms/DisbandClubModal";

export default function ClubRemovePage() {
  return (
    <>
      <ClubList />
      <DisbandClubModal />
      <DisbandClubFormModal />
    </>
  );
}
