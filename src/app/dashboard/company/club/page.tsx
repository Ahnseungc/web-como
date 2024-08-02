import ClubOverview from "@/components/dashboard/company/club/molecules/ClubOverview";
import ClubView from "@/components/dashboard/company/club/templates/ClubView";
import ApplicantProfileModal from "@/components/dashboard/company/club/modals/ApplicantProfileModal";

export default function Page() {
  return (
    <>
      <ClubOverview />
      <ClubView />
      <div className="mt-0">
        <ApplicantProfileModal />
      </div>
    </>
  );
}
