import BackButton from "@/components/dashboard/common/BackButton";
import ReportDetailView from "@/components/dashboard/company/club/templates/ReportDetailView";
import ReportConfirmModal from "@/components/dashboard/company/club/modals/ReportConfirmModal";
import ReportRerequestModal from "@/components/dashboard/company/club/modals/ReportRerequestModal";

export default function Page() {
  return (
    <>
      <BackButton />
      <ReportDetailView />
      <div className="mt-0">
        <ReportConfirmModal />
        <ReportRerequestModal />
      </div>
    </>
  );
}
