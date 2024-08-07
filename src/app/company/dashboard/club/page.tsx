import ClubOverview from "@/components/dashboard/company/club/molecules/ClubOverview";
import ClubView from "@/components/dashboard/company/club/templates/ClubView";
import ApplicantProfileModal from "@/components/dashboard/company/club/modals/ApplicantProfileModal";
import DisbandInfoModal from "@/components/dashboard/company/club/modals/DisbandInfoModal";

export default function Page() {
  return (
    <>
      <ClubOverview />
      <ClubView />
      <div className="mt-0">
        <ApplicantProfileModal />
        <DisbandInfoModal />
      </div>
    </>
  );
}
