import ClubOverview from "@/components/dashboard/company/club/molecules/ClubOverview";
import ApplicantProfileModal from "@/components/dashboard/company/club/molecules/ApplicantProfileModal";

export default function Page() {
  return (
    <>
      <ClubOverview />
      <div className="mt-0">
        <ApplicantProfileModal />
      </div>
    </>
  );
}
