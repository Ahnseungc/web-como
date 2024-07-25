import ClubList from "@/components/dashboard/remove/organisms/ClubList";
import DisbandClubFormModal from "@/components/dashboard/remove/organisms/DisbandClubFormModal";
import DisbandClubModal from "@/components/dashboard/remove/organisms/DisbandClubModal";

export default function ClubRemovePage() {
  return (
    <>
      <ClubList />
      <DisbandClubModal />
      <DisbandClubFormModal />
    </>
  );
}
