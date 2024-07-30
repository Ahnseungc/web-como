import EmployeeShortcut from "@/components/dashboard/company/main/molecules/EmployeeShortcut";
import ClubNumbers from "@/components/dashboard/company/main/molecules/ClubNumbers";
import DownloadShortcut from "@/components/dashboard/company/main/molecules/DownloadShortcut";

export default function EmployeeClubNumbers() {
  return (
    <div className="flex gap-3">
      <EmployeeShortcut />
      <ClubNumbers />
      <DownloadShortcut />
    </div>
  );
}
