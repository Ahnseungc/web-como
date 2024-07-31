import ApplicationOverview from "@/components/dashboard/company/club/molecules/ApplicationOverview";
import ApplicationView from "@/components/dashboard/company/club/templates/ApplicationView";
import ApplicantProfileModal from "@/components/dashboard/company/club/molecules/ApplicantProfileModal";
import RejectApplicationModal from "@/components/dashboard/company/club/molecules/RejectApplicationModal";
import RevertRejectionModal from "@/components/dashboard/company/club/molecules/RevertRejectionModal";

export default function NewApplicationPage() {
  return (
    <>
      <ApplicationOverview />
      <ApplicationView />
      <div className="mt-0">
        <ApplicantProfileModal />
        <RejectApplicationModal />
        <RevertRejectionModal />
      </div>
    </>
  );
}
